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
import EditIcon from "@mui/icons-material/Edit";
import AvatarListItem from "../components/common/avatarListItem/avatarListItem.component";
import DialogWindow from "../components/common/dialogWindow/dialogWindow.component";
import ScrollableStack from "../components/common/scrollableStack/scrollableStack.component";
import heroService from "../services/hero.service";
import { selectCurrentUser } from "../store/reducers/user.slice";
import { findElement } from "../utils/findElement";
import { StyledCard, StyledCardContent } from "./common/entity.styles";
import DeleteIcon from "@mui/icons-material/Delete";
import FormDialog from "../components/common/formDialog/formDialog.component";
import UpdateHeroForm from "../components/heroRelated/updateHeroForm/updateHeroForm.component";
import IHero from "../types/hero/IHero.mode";

interface IHeroEntityPageProps {}

const HeroEntityPage: React.FunctionComponent<IHeroEntityPageProps> = (
  props
) => {
  const currentUser = useSelector(selectCurrentUser);
  const isAdmin =
    currentUser &&
    findElement(currentUser.roles, process.env.REACT_APP_ADMIN_ROLE);

  const [openDeleteDialog, setOpenDeleteDialog] =
    React.useState<boolean>(false);
  const [openUpdateForm, setOpenUpdateForm] = React.useState<boolean>(false);

  const [deleteHero] = heroService.useDeleteHeroMutation();

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

            <Grid container width="100%" spacing={3}>
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Libero, culpa quisquam delectus in animi temporibus nihil
                  natus! Enim explicabo error impedit excepturi, rem harum a
                  inventore, molestias magni laboriosam doloremque?
                </Typography>
              </Grid>
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

        {currentUser &&
          findElement(currentUser.roles, process.env.REACT_APP_ADMIN_ROLE) && (
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
                title={`Delete movie ${data?.name}`}
                context="Are you sure want to delete the movie, all data related to movie also will be deleted"
                action={async () => {
                  if (data?.id) {
                    await deleteHero(data?.id);
                  }
                }}
              />

              <FormDialog
                open={openUpdateForm}
                setOpen={setOpenUpdateForm}
                title={""}
              >
                <UpdateHeroForm
                  open={openUpdateForm}
                  setOpen={setOpenUpdateForm}
                  hero={data as IHero}
                />
              </FormDialog>
            </>
          )}
      </Container>
    </Box>
  );
};

export default HeroEntityPage;
