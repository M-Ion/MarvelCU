import { FC } from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Grid, SvgIconTypeMap } from "@mui/material";

import { Blur, Heading, Title } from "./headingBg.styles";

type Props = {
  bgImg: string;
  title: string;
  Icon: OverridableComponent<SvgIconTypeMap>;
};

const HeadingBg: FC<Props> = ({ bgImg, title, Icon }) => {
  return (
    <Heading urlimg={bgImg} disableGutters maxWidth="lg">
      <Blur>
        <Grid container alignItems="center" justifyContent="center">
          <Icon sx={{ fontSize: 100 }} />
          <Title>{title}</Title>
        </Grid>
      </Blur>
    </Heading>
  );
};

export default HeadingBg;
