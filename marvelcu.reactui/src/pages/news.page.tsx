import { Container, Grid, Typography, useTheme } from "@mui/material";
import Post from "../components/newsRelated/post/post.component";

const NewsPage = () => {
  const theme = useTheme();

  return (
    <Container
      maxWidth="lg"
      disableGutters
      sx={{ padding: theme.spacing(8, 0, 6) }}
    >
      <Typography component="h1" variant="h5" textAlign={"start"} mb={4}>
        News
      </Typography>
      <Grid container alignItems="center" flexDirection="column">
        {[1, 2, 3].map((el) => (
          <Post key={el} title={""} content={""} postedDate={new Date()} />
        ))}
      </Grid>
    </Container>
  );
};

export default NewsPage;
