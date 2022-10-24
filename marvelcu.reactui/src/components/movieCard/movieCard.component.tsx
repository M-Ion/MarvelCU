import {
  Button,
  CardActions,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

import { MovieCardStyled, CardContentStyled } from "./movieCard.styles";

const MovieCard = () => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <MovieCardStyled>
        <CardMedia
          sx={{ paddingTop: "80%" }}
          image="/marvel.webp"
          title="Image title"
        />
        <CardContentStyled>
          <Typography gutterBottom variant="h5" component="h2">
            Heading
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            This is a media card. You can use this section to describe the
            content.
          </Typography>
        </CardContentStyled>
        <CardActions>
          <Button size="small" color="secondary">
            View
          </Button>
        </CardActions>
      </MovieCardStyled>
    </Grid>
  );
};

export default MovieCard;
