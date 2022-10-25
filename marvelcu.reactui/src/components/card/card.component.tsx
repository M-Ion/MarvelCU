import { CardActionsProps, CardMedia, Grid, Typography } from "@mui/material";
import { FC } from "react";

import { CardContentStyled, CardStyled } from "./card.styles";

type Props = {
  heading: string;
  imageurl: string;
  description: string;
  CardActionsNode: FC<CardActionsProps> | null;
};

const Card: FC<Props> = ({
  heading,
  imageurl,
  description,
  CardActionsNode,
}) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <CardStyled>
        <CardMedia
          sx={{ paddingTop: "80%" }}
          image={"https://source.unsplash.com/random"}
        />
        <CardContentStyled>
          <Typography gutterBottom variant="h5" component="h2">
            {heading}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContentStyled>
        {CardActionsNode && <CardActionsNode />}
      </CardStyled>
    </Grid>
  );
};

export default Card;
