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
import { LoadingButton } from "@mui/lab";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import blobService from "../../services/blob.service";
import movieService from "../../services/entities/movie.service";
import { selectUser } from "../../services/store/slices/user.slice";
import { Review as ReviewType } from "../../types/entites/review.types";
import { fileExtension } from "../../utils/string.utils";
import {
  btnDeleteSx,
  btnRightSx,
  CardContentStyled,
  CardStyled,
  entityContainerSx,
  headerCardSx,
} from "../common.styles";
import { Saga } from "../../types/enums/sagas.enum";
import YouTubePlayer from "../../components/commons/youTubePlayer";
import ScrollStack from "../../components/commons/scrollStack";
import AddReviewForm from "../../components/forms/review/add";
import UpdateReviewForm from "../../components/forms/review/update";
import AvatarItem from "../../components/commons/avatarItem";
import ConfirmDialog from "../../components/commons/confirmDialog";
import ContainerDialog from "../../components/commons/containerDialog";
import UpdateMovieForm from "../../components/forms/movie/update";
import Footer from "../../components/footer";
import AuthOnly from "../../components/commons/authOnly/authOnly";
import { Movie } from "../../types/entites/movie.types";
import Review from "../../components/review";

const findUserReview = (
  reviews: ReviewType[] | readonly ReviewType[],
  userId: string
): ReviewType | undefined => {
  return reviews.find((r) => r.user.id === userId);
};

const MoviePage = () => {
  let params = useParams<string>();
  const id = +(params.id as string);

  const { data, isError } = movieService.useFetchMovieEntityQuery(id);

  const [downloadMovie, { isLoading: isDownloading }] =
    blobService.useDownloadMovieMutation();

  const [deleteMovie] = movieService.useDeleteMovieEntityMutation();

  const [uploadVideoMovie, { isLoading: isVideoUploading }] =
    blobService.useUploadMovieVideoBlobMutation();

  const user = useSelector(selectUser);

  const [video, setVideo] = useState<File | null>(null);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);
  const [userReview, setUserReview] = useState<ReviewType | undefined>(
    undefined
  );

  const bought = Boolean(user?.boughtMovies.find((el) => el.id === id));

  useEffect(() => {
    if (user && data) setUserReview(findUserReview(data.reviews, user.id));
  }, [user, data]);

  const handleOpenDeleteDialog = () => setOpenDelete(true);

  const handleOpenUpdateDialog = () => setOpenUpdate(true);

  const handleVideoUpload = async () => {
    if (!video) return;
    const formData = new FormData();
    formData.append("file", video, `${id}.${fileExtension(video.name)}`);

    await uploadVideoMovie(formData);
    setVideo(null);
  };

  const handleDelete = async () => {
    if (data?.id) await deleteMovie(data?.id);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    if (target.files && target.files.length > 0) {
      const lastOne: File = target.files[target.files.length - 1];
      setVideo(lastOne);

      return;
    }

    setVideo(null);
  };

  // Components

  const AdminEntityFnc = (): JSX.Element => {
    return (
      <AuthOnly roles={[process.env.REACT_APP_ADMIN_ROLE as string]}>
        <Box sx={btnRightSx}>
          <IconButton
            component="span"
            sx={btnRightSx}
            onClick={handleOpenUpdateDialog}
          >
            <EditIcon />
          </IconButton>
          {!video ? (
            <Tooltip title="Upload movie video">
              <IconButton sx={btnRightSx} component="label">
                <input
                  hidden
                  accept="video/mp4"
                  type="file"
                  onChange={handleFileChange}
                />
                <SlideshowIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Upload">
              <LoadingButton
                loading={isVideoUploading}
                sx={btnRightSx}
                component="label"
                onClick={handleVideoUpload}
              >
                <SlideshowIcon color="success" />
              </LoadingButton>
            </Tooltip>
          )}
        </Box>
      </AuthOnly>
    );
  };

  const EntityHeader = (): JSX.Element => {
    const movieData = data as Movie;

    const handleDownloand = async () => {
      await downloadMovie({ id, name: movieData.name });
    };

    return (
      <CardStyled>
        <CardMedia
          component="img"
          image={movieData.blob ?? "/marvelLogo.jpg"}
          sx={headerCardSx}
        />

        <Grid container flexDirection={"column"}>
          <AdminEntityFnc />

          <CardContentStyled>
            <Typography variant="h4" component="div">
              {movieData.name}
            </Typography>
            <Typography variant="h6" component="div">
              Premiere {new Date(movieData.premiere).toLocaleDateString()}
            </Typography>
            <Typography variant="h6" component="div">
              Saga {Saga[movieData.mcuSaga]}
            </Typography>
            <Typography variant="h6" component="div">
              Phase {movieData.mcuPhase}
            </Typography>

            <Rating defaultValue={movieData.rating ?? 0} readOnly />
          </CardContentStyled>
          {movieData.videoBlob ? (
            !bought ? (
              <Button
                sx={{ width: 200 }}
                variant="contained"
                color="secondary"
                startIcon={<ShoppingCartIcon />}
                component={Link}
                to="/pay"
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
                onClick={handleDownloand}
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
      </CardStyled>
    );
  };

  const ActorsSection = (): JSX.Element => {
    return (
      <ScrollStack direction="row" title="Actors">
        {data?.actors.map((actor) => {
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
    );
  };

  const HeroesSection = (): JSX.Element => {
    return (
      <ScrollStack direction="row" title="Heroes">
        {data?.heroes.map((hero) => (
          <AvatarItem
            key={hero.id}
            link={`/heroes/${hero.id}`}
            title={hero.name}
            blob={hero.blob}
          />
        ))}
      </ScrollStack>
    );
  };

  return isError ? (
    <Navigate to="/notfound" replace />
  ) : (
    <Box>
      {data && (
        <Container sx={entityContainerSx}>
          <EntityHeader />

          <Paper>
            <Grid
              container
              sx={entityContainerSx}
              justifyContent="space-between"
              padding={1}
            >
              {/* YouTube trailer */}
              <Grid item flexBasis={"60%"} sx={{ height: "100%" }}>
                <YouTubePlayer source={data?.youTubeTrailerId ?? ""} />
              </Grid>

              {/* About section */}
              <Grid
                flexBasis={"35%"}
                item
                overflow="auto"
                sx={{ textAlign: "start" }}
              >
                <Typography variant="h5">About</Typography>
                <p>{data.description}</p>
              </Grid>
            </Grid>
          </Paper>

          <ScrollStack direction="column" title="Comments">
            <AuthOnly>
              {!userReview ? (
                <AddReviewForm movieId={id} />
              ) : (
                <UpdateReviewForm entity={userReview} />
              )}
            </AuthOnly>
            {data?.reviews?.map((review, index) => (
              <Review key={index} review={review} />
            ))}
          </ScrollStack>

          <ActorsSection />

          <HeroesSection />
        </Container>
      )}

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
          <UpdateMovieForm
            openState={[openUpdate, setOpenUpdate]}
            entity={data as Movie}
          />
        </ContainerDialog>
      </AuthOnly>

      <Footer />
    </Box>
  );
};

export default MoviePage;
