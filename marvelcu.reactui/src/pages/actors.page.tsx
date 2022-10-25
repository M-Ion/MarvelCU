import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import { Container, Grid, useTheme } from "@mui/material";

import ActorCard from "../components/actorCard/actorCard.component";
import HeadingBg from "../components/headingBg/headingBg.component";

const count = [1, 2, 3, 4, 5];

const ActorsPage = () => {
  const theme = useTheme();

  return (
    <>
      <HeadingBg
        bgImg={"/bgImg/actors.jpg"}
        title={"Actors"}
        Icon={TheaterComedyIcon}
      />
      <Container
        maxWidth="lg"
        disableGutters
        sx={{ padding: theme.spacing(8, 0, 6) }}
      >
        <Grid container spacing={4}>
          {count.map((el) => (
            <ActorCard key={el} />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default ActorsPage;
