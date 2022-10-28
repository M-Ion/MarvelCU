import { CardActionsProps } from "@mui/material";
import { FC } from "react";

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
    <Card heading={""} description={""} blobData={blobData}>
      {}
    </Card>
  );
};

export default HeroCard;
