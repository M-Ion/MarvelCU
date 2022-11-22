import { Actor, GetActor, PostActor } from "../../types/entites/actor.types";
import apiService, {
  favouriteEndpoints,
  genericServiceEndpoints,
} from "../api.service";

const controller: string = "Actors";

const actorService = apiService.injectEndpoints({
  endpoints: (build) => {
    const actorEndpoints = genericServiceEndpoints<
      Actor,
      GetActor,
      PostActor,
      PostActor
    >(build, `${controller}`);

    const favouriteActorEndpoints = favouriteEndpoints(build, controller);

    return {
      fetchActorEntities: actorEndpoints.fetchEntities,
      fetchActorEntity: actorEndpoints.fetchEntity,
      getFilteredActorEntities: actorEndpoints.getFilteredEntities,
      createActorEntity: actorEndpoints.createEntity,
      updateActorEntity: actorEndpoints.updateEntity,
      deleteActorEntity: actorEndpoints.deleteEntity,
      addActorToFavourites: favouriteActorEndpoints.addToFavourites,
      removeActorFromFavourites: favouriteActorEndpoints.removeFromFavourite,
    };
  },
});

export default actorService;
