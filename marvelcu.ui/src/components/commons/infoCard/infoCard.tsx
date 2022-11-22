import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React, { FC, ReactNode } from "react";
import { cardContentSx, cardMediaSx, cardSx } from "./styles";

interface InfoCardProps {
  blob: string | null;
  children: ReactNode[] | ReactNode;
  description: string;
  heading: string;
}

const InfoCard: FC<InfoCardProps> = ({
  blob,
  children,
  description,
  heading,
}) => {
  const imageurl = blob ?? "/marvelLogo.jpg";

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={cardSx}>
        <CardMedia sx={cardMediaSx} image={imageurl} />
        <CardContent sx={cardContentSx}>
          <Typography gutterBottom variant="h5" component="h2">
            {heading}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
        {children}
      </Card>
    </Grid>
  );
};

export default InfoCard;
