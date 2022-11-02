import { Box, CardMedia, Container, Grid, Typography } from "@mui/material";
import * as React from "react";
import { useParams } from "react-router-dom";
import AvatarListItem from "../../components/common/avatarListItem/avatarListItem.component";
import ScrollableStack from "../../components/common/scrollableStack/scrollableStack.component";
import actorService from "../../services/actor.service";
import {
  StyledCard,
  StyledCardContent,
} from "../movieEntity/movieEntity.styles";

interface IActorEntityPageProps {}

const ActorEntityPage: React.FunctionComponent<IActorEntityPageProps> = (
  props
) => {
  let params = useParams<string>();
  const id = +(params.actorId as string);

  const { data } = actorService.useFetchActorQuery(id);

  return (
    <Box>
      <Container sx={{ marginTop: 4 }}>
        <StyledCard>
          <CardMedia
            component="img"
            image={"/marvelLogo.jpg"}
            sx={{ width: 400 }}
          />

          {/* Movie details */}
          <Grid container width="100%" flexDirection={"row"} spacing={3}>
            <Grid item flexDirection={"column"} sx={{ flexGrow: 0 }}>
              <StyledCardContent>
                <Typography variant="h4" component="div">
                  {data && data.firstName}
                </Typography>
              </StyledCardContent>
            </Grid>
            <Grid
              item
              sx={{ padding: 4 }}
              width="50%"
              textAlign={"start"}
              alignSelf="center"
            >
              <Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero,
                culpa quisquam delectus in animi temporibus nihil natus! Enim
                explicabo error impedit excepturi, rem harum a inventore,
                molestias magni laboriosam doloremque?
              </Typography>
            </Grid>
          </Grid>
        </StyledCard>

        <ScrollableStack direction="row" title="Movies">
          {data &&
            data.movies.map((movie) => {
              return (
                <AvatarListItem
                  key={movie.id}
                  link={`/movies/${movie.id}`}
                  title={movie.name}
                />
              );
            })}
        </ScrollableStack>

        <ScrollableStack direction="row" title="Movies">
          {data &&
            data.heroes.map((hero) => {
              return (
                <AvatarListItem
                  key={hero.id}
                  link={`/heroes/${hero.id}`}
                  title={hero.name}
                />
              );
            })}
        </ScrollableStack>
      </Container>
    </Box>
  );
};

export default ActorEntityPage;
