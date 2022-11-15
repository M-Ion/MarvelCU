import { Button, CardActions, IconButton, Rating } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { selectCurrentUser } from "../../store/reducers/user.slice";
import Card from "../common/card/card.component";
import IGetMovie from "../../types/movie/IGetMovie.model";
import IUser from "../../types/user.model";
import movieService from "../../services/movie.service";

type Props = {
  dto: IGetMovie;
};

const isMovieFavourite = (user: IUser | null, movie: IGetMovie): boolean => {
  if (user == null) return false;

  const found = user.favouriteMovies.find((m) => m.id === movie.id);
  return Boolean(found);
};

const MovieCard: FC<Props> = ({ dto }) => {
  const currentUser = useSelector(selectCurrentUser);
  const [isFavourite, setFavourite] = useState<boolean>(false);
  const [addToFavourites] = movieService.useAddToFavouritesMutation();
  const [removeFromFavourites] = movieService.useRemoveFromFavouriteMutation();

  useEffect(() => {
    const found = isMovieFavourite(currentUser, dto);
    setFavourite(found);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const handleChangeFavourite = async () => {
    if (!isFavourite) {
      await addToFavourites(dto.id);
      setFavourite(true);
    } else {
      await removeFromFavourites(dto.id);
      setFavourite(false);
    }
  };

  return (
    <Card
      blob={dto.blob}
      heading={dto.name}
      description={`Saga ${dto.mcuSaga} Phase ${dto.mcuPhase}`}
    >
      <CardActions>
        <Rating value={dto.rating ?? 0} readOnly />

        <Button component={Link} to={`${dto.id}`} size="small">
          View
        </Button>

        {currentUser && (
          <IconButton
            aria-label="add to favorites"
            onClick={handleChangeFavourite}
          >
            <FavoriteIcon color={isFavourite ? "secondary" : "primary"} />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default MovieCard;
