import {
  Box,
  Button,
  CardActions,
  CircularProgress,
  Grid,
  IconButton,
  Pagination,
  Rating,
} from "@mui/material";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import Filter from "../../components/commons/filter";
import FilterGroup from "../../components/commons/filterGroup";
import PageTitle from "../../components/commons/pageTitle";
import Sidebar from "../../components/commons/sidebar";
import usePaging from "../../hooks/usePaging.hook";
import movieService from "../../services/entities/movie.service";
import { GetMovie } from "../../types/entites/movie.types";
import { Op } from "../../types/enums/operations.enum";
import { ReqProcessed } from "../../types/request.types";
import movieFilters, {
  FilterGroup as FilterGroupType,
  movieSortingProps,
} from "./filters";
import SortSelector from "../../components/commons/sortSelector";
import Search from "../../components/commons/search";
import Footer from "../../components/footer";
import { useSelector } from "react-redux";
import { selectUser } from "../../services/store/slices/user.slice";
import { findIndex } from "lodash";
import InfoCard from "../../components/commons/infoCard";
import { Link } from "react-router-dom";
import AuthOnly from "../../components/commons/authOnly/authOnly";
import RatingFilter from "../../components/commons/ratingFilter";
import { gridSx, PageContainerStyled, paginationSx } from "../common.styles";
import { Saga } from "../../types/enums/sagas.enum";

const MoviesPage = () => {
  const [fetchFilteredMovies, { isLoading }] =
    movieService.useGetFilteredMovieEntitiesMutation();

  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

  const {
    total,
    dataState: [data, setData],
    pagingState: [paging, setPaging],
    sortingState: [sorting, setSorting],
    filtersState: [filters, setFilters],
  } = usePaging<GetMovie>();

  const fetchMovies = async () => {
    let request: ReqProcessed = { paging, sorting, filters };
    const response = await fetchFilteredMovies(request).unwrap();

    setData(response.items);
    total.current = response.total;
  };

  const toggleSidebar = () => setOpenSidebar(!openSidebar);

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setPaging({ pageIndex: page - 1, pageSize: paging.pageSize });
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.pageIndex, filters, sorting]);

  const FilterBox = (group: FilterGroupType, key: React.Key): JSX.Element => {
    return (
      <FilterGroup key={key} title={group.label}>
        {group.filters.map((filter, index) => {
          let label =
            filter.prop === "mcuSaga" ? Saga[filter.value] : filter.value;
          return (
            <Filter
              appliedFilter={filter}
              filtersState={[filters, setFilters]}
              key={index}
              label={label}
            />
          );
        })}
      </FilterGroup>
    );
  };

  return (
    <Box component="main">
      <Sidebar openState={[openSidebar, setOpenSidebar]}>
        {movieFilters.map((filterGroup, goupIndex) =>
          FilterBox(filterGroup, goupIndex)
        )}
        <RatingFilter filtersState={[filters, setFilters]} />
      </Sidebar>

      <PageTitle
        img={"/bgImg/movies.jpg"}
        Icon={MovieCreationIcon}
        title={"Movies"}
      />

      <PageContainerStyled maxWidth="lg" disableGutters>
        <Grid container alignItems="center" sx={gridSx}>
          <Pagination
            color="secondary"
            count={Math.ceil(total.current / (paging.pageSize as number))}
            onChange={handlePageChange}
            sx={paginationSx}
          />
          <Button onClick={toggleSidebar}>Filters</Button>
          <SortSelector
            sortingState={[sorting, setSorting]}
            sortingProps={movieSortingProps}
          />
          <Search
            prop={"name"}
            operation={Op.Ct}
            filtersState={[filters, setFilters]}
          />
        </Grid>

        {isLoading ? (
          <Box className="flexCenter">
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {data.map((el) => (
              <Card key={el.id} dto={el} />
            ))}
          </Grid>
        )}
      </PageContainerStyled>
      <Footer />
    </Box>
  );
};

interface CardProps {
  dto: GetMovie;
}

const Card: FC<CardProps> = ({ dto }) => {
  const user = useSelector(selectUser);
  const [favourite, setFavourite] = useState<boolean>(false);
  const [addToFavourites] = movieService.useAddMovieToFavouritesMutation();
  const [removeFromFavourites] =
    movieService.useRemoveMovieFromFavouritesMutation();

  useEffect(() => {
    if (user) {
      const found = findIndex(user?.favouriteMovies, dto);
      if (found > -1) setFavourite(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleChange = async () => {
    if (favourite) {
      await removeFromFavourites(dto.id);
      setFavourite(false);
    } else {
      await addToFavourites(dto.id);
      setFavourite(true);
    }
  };

  return (
    <InfoCard
      blob={dto.blob}
      heading={dto.name}
      description={`Saga ${Saga[dto.mcuSaga]} Phase ${dto.mcuPhase}`}
    >
      <CardActions>
        <Rating value={dto.rating ?? 0} readOnly />

        <Button component={Link} to={`${dto.id}`} size="small">
          View
        </Button>

        <AuthOnly>
          <IconButton onClick={handleChange}>
            <FavoriteIcon color={favourite ? "secondary" : "primary"} />
          </IconButton>
        </AuthOnly>
      </CardActions>
    </InfoCard>
  );
};

export default MoviesPage;
