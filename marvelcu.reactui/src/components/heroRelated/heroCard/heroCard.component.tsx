import { Button, CardActions, IconButton } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import heroService from "../../../services/hero.service";
import { selectCurrentUser } from "../../../store/reducers/user.slice";
import FavoriteIcon from "@mui/icons-material/Favorite";

import IGetHero from "../../../types/hero/IGetHero.mode";
import Card from "../../common/card/card.component";
import IUser from "../../../types/user.model";

type Props = {
  dto: IGetHero;
};

const isHeroFavourite = (user: IUser | null, hero: IGetHero): boolean => {
  if (user == null) return false;

  const found = user.favouriteHeroes.find((h) => h.id === hero.id);
  return Boolean(found);
};

const HeroCard: FC<Props> = ({ dto }) => {
  const currentUser = useSelector(selectCurrentUser);
  const [isFavourite, setFavourite] = useState<boolean>(false);
  const [addToFavourites] = heroService.useAddToFavouritesMutation();
  const [removeFromFavourites] = heroService.useRemoveFromFavouriteMutation();

  useEffect(() => {
    const found = isHeroFavourite(currentUser, dto);
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
    <Card heading={dto.name} description={""}>
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

export default HeroCard;
