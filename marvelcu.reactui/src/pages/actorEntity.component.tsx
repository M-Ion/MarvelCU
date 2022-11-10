import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AvatarListItem from "../components/common/avatarListItem/avatarListItem.component";
import DialogWindow from "../components/common/dialogWindow/dialogWindow.component";
import ScrollableStack from "../components/common/scrollableStack/scrollableStack.component";
import actorService from "../services/actor.service";
import { selectCurrentUser } from "../store/reducers/user.slice";
import { findElement } from "../utils/findElement";
import { StyledCard, StyledCardContent } from "./common/entity.styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FormDialog from "../components/common/formDialog/formDialog.component";
import IActor from "../types/actor/IActor.model";
import UpdateActorForm from "../components/actorRelated/updateActorForm.component";

interface IActorEntityPageProps {}

const ActorEntityPage: React.FunctionComponent<IActorEntityPageProps> = (
  props
) => {
  const currentUser = useSelector(selectCurrentUser);
  const isAdmin =
    currentUser &&
    findElement(currentUser.roles, process.env.REACT_APP_ADMIN_ROLE);

  const [openDeleteDialog, setOpenDeleteDialog] =
    React.useState<boolean>(false);
  const [openUpdateForm, setOpenUpdateForm] = React.useState<boolean>(false);

  const [deleteActor] = actorService.useDeleteActorMutation();

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
          <Grid container flexDirection={"column"}>
            {isAdmin && (
              <IconButton
                component="span"
                sx={{ alignSelf: "flex-end" }}
                onClick={() => setOpenUpdateForm(true)}
              >
                <EditIcon />
              </IconButton>
            )}
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Libero, culpa quisquam delectus in animi temporibus nihil
                  natus! Enim explicabo error impedit excepturi, rem harum a
                  inventore, molestias magni laboriosam doloremque?
                </Typography>
              </Grid>
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

        {isAdmin && (
          <>
            <Grid container alignItems="flex-end" justifyContent="flex-end">
              <Button
                variant="outlined"
                color="secondary"
                sx={{ marginY: 8, marginLeft: "auto" }}
                startIcon={<DeleteIcon />}
                onClick={() => setOpenDeleteDialog(true)}
              >
                Delete
              </Button>
            </Grid>

            <DialogWindow
              open={openDeleteDialog}
              setOpen={setOpenDeleteDialog}
              title={`Delete movie ${data?.firstName}`}
              context="Are you sure want to delete the movie, all data related to movie also will be deleted"
              action={async () => {
                if (data?.id) {
                  await deleteActor(data?.id);
                }
              }}
            />

            <FormDialog
              open={openUpdateForm}
              setOpen={setOpenUpdateForm}
              title={""}
            >
              <UpdateActorForm
                open={openUpdateForm}
                setOpen={setOpenUpdateForm}
                actor={data as IActor}
              />
            </FormDialog>
          </>
        )}
      </Container>
    </Box>
  );
};

export default ActorEntityPage;
