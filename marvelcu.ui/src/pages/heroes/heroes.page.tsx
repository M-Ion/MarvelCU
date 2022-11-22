import React, { ChangeEvent, FC, useEffect, useState } from "react";
import usePaging from "../../hooks/usePaging.hook";
import GroupsIcon from "@mui/icons-material/Groups";
import FavoriteIcon from "@mui/icons-material/Favorite";
import heroService from "../../services/entities/hero.service";
import { GetHero } from "../../types/entites/hero.types";
import { ReqProcessed } from "../../types/request.types";
import PageTitle from "../../components/commons/pageTitle";
import {
  Box,
  Button,
  CardActions,
  CircularProgress,
  Grid,
  IconButton,
  Pagination,
} from "@mui/material";
import Footer from "../../components/footer";
import { gridSx, PageContainerStyled, paginationSx } from "../common.styles";
import Search from "../../components/commons/search";
import { useSelector } from "react-redux";
import { selectUser } from "../../services/store/slices/user.slice";
import { findIndex } from "../../utils/array.utils";
import InfoCard from "../../components/commons/infoCard";
import { Link } from "react-router-dom";
import AuthOnly from "../../components/commons/authOnly/authOnly";
import { Op } from "../../types/enums/operations.enum";

const HeroesPage = () => {
  const [fetchFilteredHeroes, { isLoading }] =
    heroService.useGetFilteredHeroEntitiesMutation();
  const {
    total,
    dataState: [data, setData],
    pagingState: [paging, setPaging],
    sortingState: [sorting],
    filtersState: [filters, setFilters],
  } = usePaging<GetHero>();

  const fecthHeroes = async () => {
    let request: ReqProcessed = { paging, sorting, filters };
    const response = await fetchFilteredHeroes(request).unwrap();

    setData(response.items);
    total.current = response.total;
  };

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setPaging({ pageIndex: page - 1, pageSize: paging.pageSize });
  };

  useEffect(() => {
    fecthHeroes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.pageIndex, filters]);

  return (
    <Box component="main">
      <PageTitle img={"/bgImg/heroes.jpg"} title={"Heroes"} Icon={GroupsIcon} />
      <PageContainerStyled maxWidth="lg" disableGutters>
        <Grid container alignItems="center" sx={gridSx}>
          <Pagination
            color="secondary"
            count={Math.ceil(total.current / (paging.pageSize as number))}
            onChange={handlePageChange}
            sx={paginationSx}
          />
          <Search
            prop={"name"}
            operation={Op.Ct}
            filtersState={[filters, setFilters]}
          />
        </Grid>

        {/*  Items grid */}
        {isLoading ? (
          <Box className="flexCenter">
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {data.map((el, index) => (
              <Card key={index} dto={el} />
            ))}
          </Grid>
        )}
      </PageContainerStyled>
      <Footer />
    </Box>
  );
};

interface CardProps {
  dto: GetHero;
}

const Card: FC<CardProps> = ({ dto }) => {
  const user = useSelector(selectUser);
  const [favourite, setFavourite] = useState<boolean>(false);
  const [addToFavourites] = heroService.useAddHeroToFavouritesMutation();
  const [removeFromFavourites] =
    heroService.useRemoveHeroFromFavouritesMutation();

  useEffect(() => {
    if (user) {
      const found = findIndex(user?.favouriteHeroes as GetHero[], dto);
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
    <InfoCard blob={dto.blob} heading={dto.name} description={""}>
      <CardActions>
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

export default HeroesPage;
