import { Container, Grid, useTheme } from "@mui/material";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";

import MovieCard from "../../components/movieCard/movieCard.component";
import HeadingBg from "../../components/headingBg/headingBg.component";

const count = [1, 2, 3, 4, 5];

const MoviesPage = () => {
  const theme = useTheme();

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
        <Grid container spacing={4}>
          {count.map((el) => (
            <MovieCard key={el} />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default MoviesPage;
