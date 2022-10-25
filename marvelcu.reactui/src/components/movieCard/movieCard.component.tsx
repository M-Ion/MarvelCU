import { CardActionsProps } from "@mui/material";
import { FC } from "react";
import IGetMovie from "../../types/movie/IGetMovie.model";
import Card from "../card/card.component";

type Props = {
  dto: IGetMovie;
  CardActionsNode: FC<CardActionsProps> | null;
};

const MovieCard: FC<Props> = ({ dto }) => {
  return (
    <Card
      heading={dto.name}
      imageurl={""}
      description={`Saga ${dto.mcuSaga} Phase ${dto.mcuPhase}`}
      CardActionsNode={null}
    />
  );
};

export default MovieCard;
