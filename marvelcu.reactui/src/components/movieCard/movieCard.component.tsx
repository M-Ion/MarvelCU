import { CardActions, Rating } from "@mui/material";
import { FC } from "react";
import IGetBlob from "../../types/blob/IGetBlob.model";
import IGetMovie from "../../types/movie/IGetMovie.model";
import Card from "../common/card/card.component";

type Props = {
  dto: IGetMovie;
};

const MovieCard: FC<Props> = ({ dto }) => {
  const blobData: IGetBlob = {
    blob: `${dto.id}.jpg`,
    container: "movie-images",
  };

  return (
    <Card
      blobData={blobData}
      heading={dto.name}
      description={`Saga ${dto.mcuSaga} Phase ${dto.mcuPhase}`}
    >
      <CardActions>
        <Rating value={dto.rating ?? 0} readOnly />
      </CardActions>
    </Card>
  );
};

export default MovieCard;
