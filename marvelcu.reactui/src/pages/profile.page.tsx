import { Avatar, Box, Container, Typography, useTheme } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import AvatarListItem from "../components/common/avatarListItem/avatarListItem.component";
import ScrollableStack from "../components/common/scrollableStack/scrollableStack.component";
import { selectCurrentUser } from "../store/reducers/user.slice";

interface IProfilePageProps {}

const ProfilePage: React.FunctionComponent<IProfilePageProps> = (props) => {
  const theme = useTheme();
  const currentUser = useSelector(selectCurrentUser);

  return (
    <Box component="main">
      <Container
        maxWidth="lg"
        disableGutters
        sx={{ padding: theme.spacing(8, 0, 6) }}
      >
        <Avatar sx={{ height: 140, margin: "auto", width: 140 }}>
          {currentUser?.firstName[0]}
        </Avatar>
        <Typography sx={{ padding: 2 }}>
          {currentUser?.firstName} {currentUser?.lastName}
        </Typography>

        <ScrollableStack direction="row" title="Favourites Movies">
          {currentUser &&
            currentUser.favouriteMovies.map((movie) => (
              <AvatarListItem
                key={movie.id}
                link={`/movies/${movie.id}`}
                title={movie.name}
                blob={movie.blob}
              />
            ))}
        </ScrollableStack>

        <ScrollableStack direction="row" title="Favourites Heroes">
          {currentUser &&
            currentUser.favouriteHeroes.map((hero) => (
              <AvatarListItem
                key={hero.id}
                link={`/heroes/${hero.id}`}
                title={hero.name}
                blob={hero.blob}
              />
            ))}
        </ScrollableStack>

        <ScrollableStack direction="row" title="Favourites Actors">
          {currentUser &&
            currentUser.favouriteActors.map((actor) => (
              <AvatarListItem
                key={actor.id}
                link={`/actors/${actor.id}`}
                title={`${actor.firstName} ${actor.middleName} ${actor.lastName}`}
                blob={actor.blob}
              />
            ))}
        </ScrollableStack>
      </Container>
    </Box>
  );
};

export default ProfilePage;
