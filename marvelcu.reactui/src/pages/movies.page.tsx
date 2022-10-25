import { Container, Grid, Pagination, useTheme } from "@mui/material";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import { ChangeEvent, useEffect } from "react";

import HeadingBg from "../components/headingBg/headingBg.component";
import IGetMovie from "../types/movie/IGetMovie.model";
import IProcessedRequest from "../types/processing/IProcessedRequest.model";
import MovieCard from "../components/movieCard/movieCard.component";
import movieService from "../services/movie.service";
import usePagingReques from "../hooks/usePaging.hook";

const MoviesPage = () => {
  const theme = useTheme();

  const { total, data, setData, paging, setPaging, sorting } =
    usePagingReques<IGetMovie>();

  // Query for filtered movie request
  const [fetchFilteredData] = movieService.useGetFilteredMoviesMutation();

  const fetchMovies = async () => {
    let request: IProcessedRequest = { paging, sorting, filters: [] };
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
      });
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.pageIndex]);

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setPaging({ pageIndex: page - 1, pageSize: paging.pageSize });
  };

  return (
    <>
      <HeadingBg
        bgImg={"/bgImg/movies.jpg"}
        title={"Movies"}
        Icon={MovieCreationIcon}
      />

      <Container
        maxWidth="lg"
        disableGutters
        sx={{ padding: theme.spacing(8, 0, 6) }}
      >
        <Pagination
          count={Math.ceil(total.current / (paging.pageSize as number))}
          onChange={handlePageChange}
          sx={{ marginBottom: 2 }}
        />
        <Grid container spacing={4}>
          {data.map((el) => (
            <MovieCard key={el.id} dto={el} CardActionsNode={null} />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default MoviesPage;
