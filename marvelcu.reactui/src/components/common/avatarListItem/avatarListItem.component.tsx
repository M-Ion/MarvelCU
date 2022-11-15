import { Box, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";

import { StyledAvatar } from "./avatarListItem.styles";

type Props = {
  title: string;
  link: string;
  blob: string | null;
};

const AvatarListItem: FC<Props> = ({ link, title, blob }) => {
  return (
    <Box
      component={Link}
      to={link}
      sx={{ textDecoration: "none", color: "black" }}
    >
      <Grid container flexDirection="column" alignItems="center">
        <StyledAvatar src={blob ?? "/marvelLogo.jpg"} sx={{ marginX: 10 }} />
        <Typography>{title}</Typography>
      </Grid>
    </Box>
  );
};

export default AvatarListItem;
