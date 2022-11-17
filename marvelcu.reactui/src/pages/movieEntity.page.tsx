import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Paper,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SlideshowIcon from "@mui/icons-material/Slideshow";

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
import { ChangeEvent, useEffect, useState } from "react";
import NotFoundPage from "./notFound.page";
import DialogWindow from "../components/common/dialogWindow.component";
import { findElement } from "../utils/findElement";
import FormDialog from "../components/common/formDialog.component";
import UpdateMovieForm from "../components/movieRelated/updateMovieForm.component";
import Saga from "../types/movie/Sagas";
import blobService from "../services/blob.services";
import { LoadingButton } from "@mui/lab";

const defaultDescription: string = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis optio accusamus adipisci, officia est consequuntur obcaecati veritatis ratione magni temporibus voluptates maxime sed corporis ad. Repellat excepturi eos est suscipit id sunt accusamus consequuntur saepe voluptatum, nam velit eveniet ipsa.`;

const findReviewByUser = (
  reviews: IGetReview[] | undefined,
  userId: string
): IGetReview | undefined => {
  if (reviews === undefined) return undefined;

  return reviews.find((r) => r.user.id === userId);
};

const MovieEntityPage = () => {
  let params = useParams<string>();
  const id = +(params.movieId as string);

  const currentUser = useSelector(selectCurrentUser);

  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [openUpdateForm, setOpenUpdateForm] = useState<boolean>(false);
  const [reviews, setReviews] = useState<IGetReview[] | undefined>(undefined);
  const [foundReview, setFoundReview] = useState<IGetReview | undefined>(
    undefined
  );
  const [video, setVideo] = useState<File | null>(null);

  const { data, isError } = movieService.useFetchMovieQuery(id);
  const [downloadMovie, { isLoading: isDownloading }] =
    blobService.useDownloadMovieMutation();
  const [deleteMovie] = movieService.useDeleteMovieMutation();
  const [uploadVideoMovie, { isLoading: isVideoUploading }] =
    blobService.useUploadMovieVideoBlobMutation();

  const isAdmin =
    currentUser &&
    findElement(currentUser.roles, process.env.REACT_APP_ADMIN_ROLE);

  const bought = Boolean(currentUser?.boughtMovies.find((el) => el.id === id));

  const handleUploadMovieVideo = async () => {
    if (!video) return;
    const formData = new FormData();
    formData.append("file", video, `${id}.${video.name.split(".").pop()}`);

    await uploadVideoMovie(formData);
    setVideo(null);
  };

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const lastOne: File = e.target.files[e.target.files.length - 1];
      setVideo(lastOne);

      return;
    }

    setVideo(null);
  };

  useEffect(() => {
    setReviews(data?.reviews);

    if (currentUser) {
      setFoundReview(findReviewByUser(data?.reviews, currentUser.id));
    }
  }, [data, currentUser]);

  return !isError ? (
    <Box>
      {/* Heading */}
      {data && (
        <Container sx={{ marginTop: 4 }}>
          <StyledCard>
            {/* Movie image */}
            <CardMedia
              component="img"
              image={data?.blob ?? "/marvelLogo.jpg"}
              sx={{ width: 400 }}
            />

            {/* Movie details */}
            <Grid container flexDirection={"column"}>
              {isAdmin && (
                <Box sx={{ alignSelf: "flex-end" }}>
                  <IconButton
                    component="span"
                    sx={{ alignSelf: "flex-end" }}
                    onClick={() => setOpenUpdateForm(true)}
                  >
                    <EditIcon />
                  </IconButton>
                  {!video ? (
                    <Tooltip title="Upload movie video">
                      <IconButton
                        sx={{ alignSelf: "flex-end" }}
                        component="label"
                      >
                        <input
                          hidden
                          accept="video/mp4"
                          type="file"
                          onChange={handleVideoChange}
                        />
                        <SlideshowIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Upload">
                      <LoadingButton
                        loading={isVideoUploading}
                        sx={{ alignSelf: "flex-end" }}
                        component="label"
                        onClick={handleUploadMovieVideo}
                      >
                        <SlideshowIcon color="success" />
                      </LoadingButton>
                    </Tooltip>
                  )}
                </Box>
              )}

              <StyledCardContent>
                <Typography variant="h4" component="div">
                  {data.name}
                </Typography>
                <Typography variant="h6" component="div">
                  Premiere {new Date(data.premiere).toLocaleDateString()}
                </Typography>
                <Typography variant="h6" component="div">
                  Saga {Saga[data.mcuSaga]}
                </Typography>
                <Typography variant="h6" component="div">
                  Phase {data.mcuPhase}
                </Typography>

                <Rating defaultValue={3} readOnly />
              </StyledCardContent>
              {data.videoBlob ? (
                !bought ? (
                  <Button
                    sx={{ width: 200 }}
                    variant="contained"
                    color="secondary"
                    startIcon={<ShoppingCartIcon />}
                    component={Link}
                    to="/Checkout"
                    state={{
                      productId: id,
                      productName: data?.name,
                      amount: data?.price,
                    }}
                  >
                    Buy
                  </Button>
                ) : (
                  <LoadingButton
                    loading={isDownloading}
                    sx={{ width: 200 }}
                    variant="contained"
                    color="secondary"
                    startIcon={<DownloadIcon />}
                    onClick={async () => {
                      await downloadMovie({ id: "Wakanda", name: data.name });
                    }}
                  >
                    Download
                  </LoadingButton>
                )
              ) : (
                <Button sx={{ width: 200 }} disabled variant="contained">
                  Coming Soon
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
            {currentUser &&
              (!foundReview ? (
                <ReviewForm movieId={id} />
              ) : (
                <UpdateReviewForm review={foundReview} />
              ))}

            {reviews?.map((review, index) => (
              <Review key={index} review={review} />
            ))}
          </ScrollableStack>

          {/* List of actors */}
          <ScrollableStack direction="row" title="Actors">
            {data &&
              data.actors.map((actor) => {
                return (
                  <AvatarListItem
                    key={actor.id}
                    link={`/actors/${actor.id}`}
                    title={actor.name}
                    blob={actor.blob}
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
                  blob={hero.blob}
                />
              ))}
          </ScrollableStack>
        </Container>
      )}

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
