import { GetMovie, Movie, PostMovie } from "../../types/entites/movie.types";
import { Payment } from "../../types/payment.types";
import apiService, {
  favouriteEndpoints,
  genericServiceEndpoints,
} from "../api.service";

const controller: string = "Movies";

const movieService = apiService.injectEndpoints({
  endpoints: (build) => {
    const movieEndpoints = genericServiceEndpoints<
      Movie,
      GetMovie,
      PostMovie,
      PostMovie
    >(build, `${controller}`);

    const favouritMovieEndpoints = favouriteEndpoints(build, controller);

    return {
      fetchMovieEntities: movieEndpoints.fetchEntities,
      fetchMovieEntity: movieEndpoints.fetchEntity,
      getFilteredMovieEntities: movieEndpoints.getFilteredEntities,
      createMovieEntity: movieEndpoints.createEntity,
      updateMovieEntity: movieEndpoints.updateEntity,
      deleteMovieEntity: movieEndpoints.deleteEntity,
      addMovieToFavourites: favouritMovieEndpoints.addToFavourites,
      removeMovieFromFavourites: favouritMovieEndpoints.removeFromFavourite,

      buyMovie: build.mutation<void, { id: number; body: Payment }>({
        query: (args) => ({
          url: `/${controller}/Buy/${args.id}`,
          method: "POST",
          body: args.body,
        }),

        invalidatesTags: (result, _, arg) => [{ type: "Movies", id: arg.id }],
      }),
    };
  },
});

export default movieService;
