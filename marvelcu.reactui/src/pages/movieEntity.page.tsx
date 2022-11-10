import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { StyledCard, StyledCardContent } from "./common/entity.styles";
import AvatarListItem from "../components/common/avatarListItem/avatarListItem.component";
import Footer from "../components/footer/footer.component";
import IMovie from "../types/movie/IMovie.model";
import movieService from "../services/movie.service";
import Review from "../components/reviewRelated/review/review.component";
import ScrollableStack from "../components/common/scrollableStack/scrollableStack.component";
import YouTubeVideo from "../components/common/youTubeVideo/youTubeVideo.component";
import ReviewForm from "../components/reviewRelated/reviewForm/reviewForm.component";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/reducers/user.slice";
import UpdateReviewForm from "../components/reviewRelated/updateReviewForm/updateReviewForm.component";
import IGetReview from "../types/review/IGetReview.model";
import { useEffect, useState } from "react";
import NotFoundPage from "./notFound.page";
import DialogWindow from "../components/common/dialogWindow/dialogWindow.component";
import { findElement } from "../utils/findElement";
import FormDialog from "../components/common/formDialog/formDialog.component";
import UpdateMovieForm from "../components/movieRelated/updateMovieForm/updateMovieForm.component";

const fields: readonly (keyof IMovie)[] = ["premiere", "mcuPhase", "mcuSaga"];
const defaultDescription: string = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis optio accusamus adipisci, officia est consequuntur obcaecati veritatis ratione magni temporibus voluptates maxime sed corporis ad. Repellat excepturi eos est suscipit id sunt accusamus consequuntur saepe voluptatum, nam velit eveniet ipsa.`;

const findReviewByUser = (
  reviews: IGetReview[] | undefined,
  userId: string
): IGetReview | undefined => {
  if (reviews === undefined) return undefined;

  return reviews.find((r) => r.user.id === userId);
};

const MovieEntityPage = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isAdmin =
    currentUser &&
    findElement(currentUser.roles, process.env.REACT_APP_ADMIN_ROLE);

  const [reviews, setReviews] = useState<IGetReview[] | undefined>(undefined);
  const [foundReview, setFoundReview] = useState<IGetReview | undefined>(
    undefined
  );
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [openUpdateForm, setOpenUpdateForm] = useState<boolean>(false);

  const [deleteMovie] = movieService.useDeleteMovieMutation();

  let params = useParams<string>();
  const id = +(params.movieId as string);

  const bought = Boolean(currentUser?.boughtMovies.find((el) => el.id === id));

  const { data, isError } = movieService.useFetchMovieQuery(id);

  useEffect(() => {
    setReviews(data?.reviews);

    if (currentUser) {
      setFoundReview(findReviewByUser(data?.reviews, currentUser.id));
    }
  }, [data, currentUser]);

  return !isError ? (
    <Box>
      {/* Heading */}
      <Container sx={{ marginTop: 4 }}>
        <StyledCard>
          {/* Movie image */}
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

            <StyledCardContent>
              <Typography variant="h4" component="div">
                {data && data.name}
              </Typography>
              {data &&
                fields.map((el, index) => (
                  <Typography key={index} variant="h6" component="div">
                    {el} {data[el] as string}
                  </Typography>
                ))}
              <Rating defaultValue={3} readOnly />
            </StyledCardContent>
            {!bought ? (
              <Button
                sx={{ width: 200 }}
                variant="contained"
                color="secondary"
                startIcon={<ShoppingCartIcon />}
                component={Link}
                to="/Checkout"
                state={{ productId: id, productName: data?.name, amount: 25 }}
              >
                Buy
              </Button>
            ) : (
              <Button
                sx={{ width: 200 }}
                variant="contained"
                color="secondary"
                startIcon={<DownloadIcon />}
                component="a"
                download
                href={`${process.env.REACT_APP_API_BASE_URL}/Blobs/Download/Video/Wakanda`}
              >
                Download
              </Button>
            )}
          </Grid>
        </StyledCard>

        <Paper>
          <Grid
            container
            sx={{ marginTop: 5 }}
            justifyContent="space-between"
            padding={1}
          >
            {/* YouTube trailer */}
            <Grid item flexBasis={"60%"}>
              <YouTubeVideo sourceId={data?.youTubeTrailerId ?? ""} />
            </Grid>

            {/* About section */}
            <Grid
              flexBasis={"35%"}
              item
              overflow="auto"
              sx={{ textAlign: "start" }}
            >
              <Typography variant="h5">About</Typography>
              <p>{defaultDescription}</p>
            </Grid>
          </Grid>
        </Paper>

        {/* Reviews */}
        <ScrollableStack direction="column" title="Comments">
          {!foundReview ? (
            <ReviewForm movieId={id} />
          ) : (
            <UpdateReviewForm review={foundReview} />
          )}

          {reviews?.map((review, index) => (
            <Review key={index} review={review} />
          ))}
        </ScrollableStack>

        {/* List of actors */}
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

        {/* List of heroes */}
        <ScrollableStack direction="row" title="Heroes">
          {data &&
            data.heroes.map((hero) => (
              <AvatarListItem
                key={hero.id}
                link={`/heroes/${hero.id}`}
                title={hero.name}
              />
            ))}
        </ScrollableStack>
      </Container>

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
            title={`Delete movie ${data?.name}`}
            context="Are you sure want to delete the movie, all data related to movie also will be deleted"
            action={async () => {
              if (data?.id) {
                await deleteMovie(data?.id);
              }
            }}
          />

          <FormDialog
            open={openUpdateForm}
            setOpen={setOpenUpdateForm}
            title={""}
          >
            <UpdateMovieForm
              open={openUpdateForm}
              setOpen={setOpenUpdateForm}
              movie={data as IMovie}
            />
          </FormDialog>
        </>
      )}

      <Footer />
    </Box>
  ) : (
    <NotFoundPage />
  );
};

export default MovieEntityPage;
