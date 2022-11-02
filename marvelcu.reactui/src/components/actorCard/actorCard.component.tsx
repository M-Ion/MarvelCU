import { Button, CardActions, CardActionsProps } from "@mui/material";
import { FC } from "react";

import Card from "../common/card/card.component";
import IGetActor from "../../types/actor/IGetActor.model";
import IGetBlob from "../../types/blob/IGetBlob.model";
import { Link } from "react-router-dom";

type Props = {
  dto: IGetActor;
};

const ActorCard: FC<Props> = ({ dto }) => {
  const blobData: IGetBlob = {
    blob: `${dto.id}.jpg`,
    container: "actor-images",
  };
  const { firstName, middleName, lastName } = dto;
  const fullName = `${firstName} ${middleName ?? ""} ${lastName ?? ""}`;

  return (
    <Card heading={fullName} description={""} blobData={blobData}>
      <CardActions>
        <Button component={Link} to={`${dto.id}`} size="small">
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default ActorCard;
