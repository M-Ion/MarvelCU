import { CSSProperties } from "react";
import { Container, styled, SxProps } from "@mui/system";

interface PageTitleStylesProps {
  img: string;
}

export const ContainerStyled = styled(Container)<PageTitleStylesProps>(
  (props) => ({
    backgroundImage: `url(${props.img})`,
    backgroundPosition: "top",
    backgroundSize: "cover",
    height: 400,
  })
);

export const blurCSS: CSSProperties = {
  alignItems: "center",
  backgroundColor: "rgba(0,0,0, 0.4)",
  color: "white",
};

export const titleSx: SxProps = {
  fontSize: 80,
  marginLeft: 6,
};

export const iconSx: SxProps = {
  fontSize: 100,
};
