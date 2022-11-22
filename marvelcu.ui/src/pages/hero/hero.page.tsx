import React, { useState } from "react";
import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Navigate, useParams } from "react-router-dom";
import heroService from "../../services/entities/hero.service";
import {
  btnDeleteSx,
  btnRightSx,
  CardContentStyled,
  CardStyled,
  entityContainerSx,
  headerCardSx,
} from "../common.styles";
import ScrollStack from "../../components/commons/scrollStack";
import AvatarItem from "../../components/commons/avatarItem";
import ConfirmDialog from "../../components/commons/confirmDialog";
import ContainerDialog from "../../components/commons/containerDialog";
import AuthOnly from "../../components/commons/authOnly/authOnly";
import UpdateHeroForm from "../../components/forms/hero/update";
import { Hero } from "../../types/entites/hero.types";
import Footer from "../../components/footer";

const HeroPage = () => {
  let params = useParams<string>();
  const id = +(params.id as string);

  const { data, isError } = heroService.useFetchHeroEntityQuery(id);

  const [deleteMovie] = heroService.useDeleteHeroEntityMutation();

  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);

  const handleOpenDeleteDialog = () => setOpenDelete(true);

  const handleOpenUpdateDialog = () => setOpenUpdate(true);

  const EntityHeader = (): JSX.Element => (
    <CardStyled>
      <CardMedia
        component="img"
        image={data?.blob ?? "/marvelLogo.jpg"}
        sx={headerCardSx}
      />

      <Grid container flexDirection={"column"}>
        <AuthOnly roles={[process.env.REACT_APP_ADMIN_ROLE as string]}>
          <IconButton
            component="span"
            sx={btnRightSx}
            onClick={handleOpenUpdateDialog}
          >
            <EditIcon />
          </IconButton>
        </AuthOnly>

        <Grid container width="100%" spacing={3}>
          <Grid item flexDirection={"column"} sx={{ flexGrow: 0 }}>
            <CardContentStyled>
              <Typography variant="h4" component="div">
                {data && data.name}
              </Typography>
            </CardContentStyled>
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
      </Grid>
    </CardStyled>
  );

  const Administration = (): JSX.Element => {
    const handleDelete = async () => {
      if (data?.id) await deleteMovie(data?.id);
    };

    return (
      <AuthOnly roles={[process.env.REACT_APP_ADMIN_ROLE as string]}>
        <Grid container alignItems="flex-end" justifyContent="flex-end">
          <Button
            variant="outlined"
            color="secondary"
            sx={btnDeleteSx}
            startIcon={<DeleteIcon />}
            onClick={handleOpenDeleteDialog}
          >
            Delete
          </Button>
        </Grid>

        <ConfirmDialog
          openState={[openDelete, setOpenDelete]}
          title={`Delete movie ${data?.name}`}
          context="Are you sure want to delete the movie, all data related to movie also will be deleted"
          fnc={handleDelete}
        />

        <ContainerDialog openState={[openUpdate, setOpenUpdate]}>
          <UpdateHeroForm
            openState={[openUpdate, setOpenUpdate]}
            entity={data as Hero}
          />
        </ContainerDialog>
      </AuthOnly>
    );
  };

  return isError ? (
    <Navigate to="/notfound" replace />
  ) : (
    <Box>
      <Container sx={entityContainerSx}>
        <EntityHeader />

        <ScrollStack direction="row" title="Actors">
          {data &&
            data.actors.map((actor) => {
              return (
                <AvatarItem
                  key={actor.id}
                  link={`/actors/${actor.id}`}
                  title={actor.name}
                  blob={actor.blob}
                />
              );
            })}
        </ScrollStack>

        <ScrollStack direction="row" title="Movies">
          {data &&
            data.movies.map((movie) => {
              return (
                <AvatarItem
                  key={movie.id}
                  link={`/movies/${movie.id}`}
                  title={movie.name}
                  blob={movie.blob}
                />
              );
            })}
        </ScrollStack>

        <Administration />
      </Container>
      <Footer />
    </Box>
  );
};

export default HeroPage;
