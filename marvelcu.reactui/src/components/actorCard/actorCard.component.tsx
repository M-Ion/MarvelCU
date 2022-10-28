import { CardActionsProps } from "@mui/material";
import { FC } from "react";

import Card from "../common/card/card.component";
import IGetActor from "../../types/actor/IGetActor.model";
import IGetBlob from "../../types/blob/IGetBlob.model";

type Props = {
  dto: IGetActor;
};

const ActorCard: FC<Props> = ({ dto }) => {
  const blobData: IGetBlob = {
    blob: `${dto.id}.jpg`,
    container: "actor-images",
  };

  return (
    <Card heading={""} description={""} blobData={blobData}>
      {}
    </Card>
  );
};

export default ActorCard;
