import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  Rating,
  useTheme,
} from "@mui/material";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";

import {
  AddInFiltersState,
  RemoveFromFiltersState,
} from "../utils/setFiltersState.utils";
import { movieSortingFields } from "../utils/sorting";
import CheckBoxFilter from "../components/common/checkBoxFilter/checkBoxFilter.component";
import FilterBox from "../components/common/filterBox/filterBox.component";
import FilterSidebar from "../components/common/filterSidebar/filterSidebar.component";
import Footer from "../components/footer/footer.component";
import HeadingBg from "../components/common/headingBg/headingBg.component";
import IFilter from "../types/processing/IFilter.model";
import IGetMovie from "../types/movie/IGetMovie.model";
import IProcessedRequest from "../types/processing/IProcessedRequest.model";
import MovieCard from "../components/movieCard/movieCard.component";
import movieFilters from "../utils/filters/movie.filters";
import movieService from "../services/movie.service";
import Op from "../types/processing/Op";
import SearchBar from "../components/common/searchBar/searchBar.component";
import SortSelector from "../components/common/sortSelector/sortSelector.component";
import usePagingReques from "../hooks/usePaging.hook";

const MoviesPage = () => {
  const theme = useTheme();
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [rating, setRating] = useState<number | null>(null);

  const {
    total,
    data,
    setData,
    paging,
    setPaging,
    sorting,
    filters,
    setFilters,
    setSorting,
  } = usePagingReques<IGetMovie>();

  // Query for filtered movie request
  const [fetchFilteredData, { isLoading }] =
    movieService.useGetFilteredMoviesMutation();

  const fetchMovies = async () => {
    let request: IProcessedRequest = { paging, sorting, filters };
    await fetchFilteredData(request)
      .unwrap()
      .then((data) => {
        const { items, pageIndex, pageSize } = data;

        // Set paging
        setPaging({ pageIndex, pageSize });

        // Set items
        setData(items);

        // Total number of items
        total.current = data.total;
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.pageIndex, filters, sorting]);

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setPaging({ pageIndex: page - 1, pageSize: paging.pageSize });
  };

  const handleRatingFilterChange = (
    event: SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
    let ratingFilter: IFilter = {
      prop: "rating",
      operation: Op.Eq,
      value: value as number,
    };

    if (value === null) {
      setFilters(RemoveFromFiltersState(filters, ratingFilter));
      setRating(null);

      return;
    }

    let updatedFilters = AddInFiltersState(filters, ratingFilter, true);

    setFilters(updatedFilters);
    setRating(value as number);
  };

  return (
    <Box component="main">
      {/* Hidden filters left sidebar */}
      <FilterSidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar}>
        {movieFilters.map((filterGroup, goupIndex) => (
          <FilterBox key={goupIndex} title={filterGroup.label}>
            {filterGroup.filters.map((filter, index) => (
              <CheckBoxFilter
                key={index}
                onChecked={setFilters}
                label={filter.value}
                filter={filter}
                filters={filters}
              />
            ))}
          </FilterBox>
        ))}
        <FilterBox title={"Rating"}>
          <Rating onChange={handleRatingFilterChange} value={rating} />
        </FilterBox>
      </FilterSidebar>

      {/* Heading wallpaper with page title */}
      <HeadingBg
        bgImg={"/bgImg/movies.jpg"}
        Icon={MovieCreationIcon}
        title={"Movies"}
      />

      {/* Content */}
      <Container
        maxWidth="lg"
        disableGutters
        sx={{ padding: theme.spacing(8, 0, 6) }}
      >
        <Grid container alignItems="center" sx={{ gap: 2 }}>
          <Pagination
            color="secondary"
            count={Math.ceil(total.current / (paging.pageSize as number))}
            onChange={handlePageChange}
            sx={{ marginBottom: 2 }}
          />
          <Button onClick={() => setShowSidebar(!showSidebar)}>Filters</Button>
          <SortSelector
            setSort={setSorting}
            sort={sorting}
            sortFields={movieSortingFields}
          />
          <SearchBar
            prop={"name"}
            operation={Op.Ct}
            filters={filters}
            setFilters={setFilters}
          />
        </Grid>

        {/*  Items grid */}
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {data.map((el) => (
              <MovieCard key={el.id} dto={el} />
            ))}
          </Grid>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default MoviesPage;
