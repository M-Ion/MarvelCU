import {
  Box,
  CardMedia,
  Container,
  Grid,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";

import { StyledCard, StyledCardContent } from "./movieEntity.styles";
import AvatarListItem from "../../components/common/avatarListItem/avatarListItem.component";
import Footer from "../../components/footer/footer.component";
import IMovie from "../../types/movie/IMovie.model";
import movieService from "../../services/movie.service";
import Review from "../../components/common/review/review.component";
import ScrollableStack from "../../components/common/scrollableStack/scrollableStack.component";
import YouTubeVideo from "../../components/common/youTubeVideo/youTubeVideo.component";
import ReviewForm from "../../components/reviewForm/reviewForm.component";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/reducers/user.slice";
import UpdateReviewForm from "../../components/updateReviewForm/updateReviewForm.component";
import IGetReview from "../../types/review/IGetReview.model";
import { useEffect, useState } from "react";

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
  const [foundReview, setFoundReview] = useState<IGetReview | undefined>(
    undefined
  );
  const [reviews, setReviews] = useState<IGetReview[] | undefined>(undefined);

  let params = useParams<string>();
  const id = +(params.movieId as string);

  const { data } = movieService.useFetchMovieQuery(id);

  useEffect(() => {
    setReviews(data?.reviews);

    if (currentUser) {
      setFoundReview(findReviewByUser(data?.reviews, currentUser.id));
    }
  }, [data, currentUser]);

  return (
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
              <YouTubeVideo
                sourceId={
                  "v=j60ClcNYWu4&list=RD1gKZk0O2jPU&index=5&ab_channel=ImagineDragonsVEVO"
                }
              />
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
            <ReviewForm />
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

      <Footer />
    </Box>
  );
};

export default MovieEntityPage;
