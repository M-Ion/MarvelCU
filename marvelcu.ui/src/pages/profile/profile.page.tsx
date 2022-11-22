import { Avatar, Box, Typography } from "@mui/material";
import * as React from "react";
import AvatarItem from "../../components/commons/avatarItem";
import ScrollStack from "../../components/commons/scrollStack";
import useAuth from "../../hooks/useAuth.hook";
import { PageContainerStyled } from "../common.styles";
import { avatarSx, titleSx } from "./styles";

const ProfilePage = () => {
  const [user] = useAuth();

  return (
    user && (
      <Box component="main">
        <PageContainerStyled maxWidth="lg" disableGutters>
          <Avatar sx={avatarSx}>{user.firstName[0]}</Avatar>
          <Typography sx={titleSx}>
            {user.firstName} {user.lastName}
          </Typography>

          <ScrollStack direction="row" title="Favourites Movies">
            {user.favouriteMovies.map((movie) => (
              <AvatarItem
                key={movie.id}
                link={`/movies/${movie.id}`}
                title={movie.name}
                blob={movie.blob}
              />
            ))}
          </ScrollStack>

          <ScrollStack direction="row" title="Favourites Heroes">
            {user.favouriteHeroes.map((hero) => (
              <AvatarItem
                key={hero.id}
                link={`/heroes/${hero.id}`}
                title={hero.name}
                blob={hero.blob}
              />
            ))}
          </ScrollStack>

          <ScrollStack direction="row" title="Favourites Actors">
            {user.favouriteActors.map((actor) => (
              <AvatarItem
                key={actor.id}
                link={`/actors/${actor.id}`}
                title={`${actor.firstName} ${actor.middleName} ${actor.lastName}`}
                blob={actor.blob}
              />
            ))}
          </ScrollStack>
        </PageContainerStyled>
      </Box>
    )
  );
};

export default ProfilePage;
