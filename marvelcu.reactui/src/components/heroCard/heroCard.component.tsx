import { Button, CardActions } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";

import IGetBlob from "../../types/blob/IGetBlob.model";
import IGetHero from "../../types/hero/IGetHero.mode";
import Card from "../common/card/card.component";

type Props = {
  dto: IGetHero;
};

const HeroCard: FC<Props> = ({ dto }) => {
  const blobData: IGetBlob = {
    blob: `${dto.id}.jpg`,
    container: "hero-images",
  };

  return (
    <Card heading={dto.name} description={""} blobData={blobData}>
      <CardActions>
        <Button component={Link} to={`${dto.id}`} size="small">
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default HeroCard;
