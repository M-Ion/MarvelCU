import { Button, CardActions, IconButton } from "@mui/material";
import { FC, useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";

import Card from "../../common/card/card.component";
import IGetActor from "../../../types/actor/IGetActor.model";
import { Link } from "react-router-dom";
import actorService from "../../../services/actor.service";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/reducers/user.slice";
import IUser from "../../../types/user.model";

type Props = {
  dto: IGetActor;
};

const isActorFavourite = (user: IUser | null, actor: IGetActor): boolean => {
  if (user == null) return false;

  const found = user.favouriteActors.find((a) => a.id === actor.id);
  return Boolean(found);
};

const ActorCard: FC<Props> = ({ dto }) => {
  const currentUser = useSelector(selectCurrentUser);
  const [isFavourite, setFavourite] = useState<boolean>(false);
  const [addToFavourites] = actorService.useAddToFavouritesMutation();
  const [removeFromFavourites] = actorService.useRemoveFromFavouriteMutation();

  useEffect(() => {
    const found = isActorFavourite(currentUser, dto);
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

  const { firstName, middleName, lastName } = dto;
  const fullName = `${firstName} ${middleName ?? ""} ${lastName ?? ""}`;

  return (
    <Card heading={fullName} description={""}>
      <CardActions>
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

export default ActorCard;
