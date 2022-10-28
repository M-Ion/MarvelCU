import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";

type HeadingProps = {
  urlimg: string;
};

export const Heading = styled(Container)<HeadingProps>((props) => ({
  backgroundImage: `url(${props.urlimg})`,
  backgroundPosition: "top",
  backgroundSize: "cover",
  height: 400,
}));

export const Blur = styled("div")({
  alignItems: "center",
  backgroundColor: "rgba(0,0,0, 0.4)",
  color: "white",
  display: "flex",
  height: "100%",
  justifyContent: "center",
  width: "100%",
});

export const Title = styled(Typography)({
  fontSize: 80,
  marginLeft: 6,
});
