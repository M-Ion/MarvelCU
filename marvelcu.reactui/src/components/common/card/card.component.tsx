import { CardMedia, Grid, Typography } from "@mui/material";
import { Children, FC, ReactNode } from "react";

import blobService from "../../../services/blob.services";
import IGetBlob from "../../../types/blob/IGetBlob.model";

import { CardContentStyled, CardStyled } from "./card.styles";

type Props = {
  blobData: IGetBlob;
  heading: string;
  description: string;
  children: ReactNode[] | ReactNode;
};

const Card: FC<Props> = ({ blobData, children, description, heading }) => {
  const { data } = blobService.useFetchBlobQuery(blobData);
  const imageurl = data?.blob ?? "/marvelLogo.jpg";

  return (
    <Grid item xs={12} sm={6} md={3}>
      <CardStyled>
        <CardMedia sx={{ paddingTop: "80%" }} image={imageurl} />
        <CardContentStyled>
          <Typography gutterBottom variant="h5" component="h2">
            {heading}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContentStyled>
        {children}
      </CardStyled>
    </Grid>
  );
};

export default Card;
