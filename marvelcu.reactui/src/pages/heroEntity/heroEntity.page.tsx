import { Box, CardMedia, Container, Grid, Typography } from "@mui/material";
import * as React from "react";
import { useParams } from "react-router-dom";
import AvatarListItem from "../../components/common/avatarListItem/avatarListItem.component";
import ScrollableStack from "../../components/common/scrollableStack/scrollableStack.component";
import heroService from "../../services/hero.service";
import { StyledCard, StyledCardContent } from "../common/entity.styles";

interface IHeroEntityPageProps {}

const HeroEntityPage: React.FunctionComponent<IHeroEntityPageProps> = (
  props
) => {
  let params = useParams<string>();
  const id = +(params.heroId as string);

  const { data } = heroService.useFetchHeroQuery(id);

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
                  {data && data.name}
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

        <ScrollableStack direction="row" title="Actors">
          {data &&
            data.actors.map((actor) => {
              const { firstName, middleName, lastName } = actor;
              let name: string = `${firstName} ${middleName} ${lastName}`;

              return (
                <AvatarListItem
                  key={actor.id}
                  link={`/actors/${actor.id}`}
                  title={name}
                />
              );
            })}
        </ScrollableStack>

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
      </Container>
    </Box>
  );
};

export default HeroEntityPage;
