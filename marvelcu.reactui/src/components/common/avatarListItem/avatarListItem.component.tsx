import { Box, Grid, Typography } from "@mui/material";
import { FC } from "react";

import { StyledAvatar } from "./avatarListItem.styles";

type Props = {
  title: string;
};

const AvatarListItem: FC<Props> = ({ title }) => {
  return (
    <Box>
      <Grid container flexDirection="column" alignItems="center">
        <StyledAvatar />
        <Typography>{title}</Typography>
      </Grid>
    </Box>
  );
};

export default AvatarListItem;
