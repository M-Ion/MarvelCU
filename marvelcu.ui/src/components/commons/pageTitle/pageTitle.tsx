import { Grid, SvgIconTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React, { FC } from "react";
import { blurCSS, ContainerStyled, iconSx, titleSx } from "./styles";

interface PageTitleProps {
  Icon: OverridableComponent<SvgIconTypeMap>;
  img: string;
  title: string;
}

const PageTitle: FC<PageTitleProps> = ({ img, title, Icon }) => {
  return (
    <ContainerStyled img={img} disableGutters maxWidth="lg">
      <div style={blurCSS} className={"fullSize flexCenter"}>
        <Grid container className="flexCenter">
          <Icon sx={iconSx} />
          <Typography sx={titleSx}>{title}</Typography>
        </Grid>
      </div>
    </ContainerStyled>
  );
};

export default PageTitle;
