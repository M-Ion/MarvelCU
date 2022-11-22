import { Container, styled, SxProps } from "@mui/system";

interface ImageUploaderStylesProps {
  img: string;
}

export const ContainerStyled = styled(Container)<ImageUploaderStylesProps>(
  ({ img }) => ({
    backgroundImage: `url(${img})`,
    backgroundPosition: "top",
    backgroundSize: "cover",
    height: 400,
    margin: 0,
    width: "50%",
  })
);

export const btnSx: SxProps = {
  margin: "8px",
};
