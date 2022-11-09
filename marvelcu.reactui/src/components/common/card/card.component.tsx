import { CardMedia, Grid, Typography } from "@mui/material";
import { FC, ReactNode } from "react";

import { CardContentStyled, CardStyled } from "./card.styles";

type Props = {
  heading: string;
  description: string;
  children: ReactNode[] | ReactNode;
};

const Card: FC<Props> = ({ children, description, heading }) => {
  const imageurl = "/marvelLogo.jpg";

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
