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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Navigate, useParams } from "react-router-dom";
import actorService from "../../services/entities/actor.service";
import {
  btnDeleteSx,
  btnRightSx,
  CardContentStyled,
  CardStyled,
  entityContainerSx,
  headerCardSx,
} from "../common.styles";
import AvatarItem from "../../components/commons/avatarItem";
import ConfirmDialog from "../../components/commons/confirmDialog";
import ContainerDialog from "../../components/commons/containerDialog";
import ScrollStack from "../../components/commons/scrollStack";
import AuthOnly from "../../components/commons/authOnly/authOnly";
import UpdateActorForm from "../../components/forms/actor/update";
import { Actor } from "../../types/entites/actor.types";
import Footer from "../../components/footer";

const ActorPage = () => {
  let params = useParams<string>();
  const id = +(params.id as string);

  const { data, isError } = actorService.useFetchActorEntityQuery(id);

  const [deleteActor] = actorService.useDeleteActorEntityMutation();

  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);

  const handleOpenDeleteDialog = () => setOpenDelete(true);

  const handleOpenUpdateDialog = () => setOpenUpdate(true);

  // Components
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

        <Grid container width="100%" flexDirection={"row"} spacing={3}>
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
      if (data?.id) await deleteActor(data?.id);
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
          title={`Delete movie ${data?.firstName}`}
          context="Are you sure want to delete the movie, all data related to movie also will be deleted"
          fnc={handleDelete}
        />

        <ContainerDialog openState={[openUpdate, setOpenUpdate]}>
          <UpdateActorForm
            openState={[openUpdate, setOpenUpdate]}
            entity={data as Actor}
          />
        </ContainerDialog>
      </AuthOnly>
    );
  };

  return isError ? (
    <Navigate to="/actors" replace />
  ) : (
    <Box>
      <Container sx={entityContainerSx}>
        <EntityHeader />

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

        <ScrollStack direction="row" title="Heroes">
          {data &&
            data.heroes.map((hero) => {
              return (
                <AvatarItem
                  key={hero.id}
                  link={`/heroes/${hero.id}`}
                  title={hero.name}
                  blob={hero.blob}
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

export default ActorPage;
