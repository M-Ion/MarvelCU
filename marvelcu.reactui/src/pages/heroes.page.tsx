import GroupsIcon from "@mui/icons-material/Groups";
import { Container, Grid, useTheme } from "@mui/material";

import HeadingBg from "../components/common/headingBg/headingBg.component";

const HeroesPage = () => {
  const theme = useTheme();

  return (
    <>
      <HeadingBg
        bgImg={"/bgImg/heroes.jpg"}
        title={"Heroes"}
        Icon={GroupsIcon}
      />
      <Container
        maxWidth="lg"
        disableGutters
        sx={{ padding: theme.spacing(8, 0, 6) }}
      >
        <Grid container spacing={4}>
          {/* {count.map((el) => (
            <HeroCard key={el} />
          ))} */}
        </Grid>
      </Container>
    </>
  );
};

export default HeroesPage;
