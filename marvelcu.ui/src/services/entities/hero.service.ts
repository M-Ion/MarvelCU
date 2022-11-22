import { GetHero, Hero, PostHero } from "../../types/entites/hero.types";
import apiService, {
  favouriteEndpoints,
  genericServiceEndpoints,
} from "../api.service";

const controller: string = "Heroes";

const heroService = apiService.injectEndpoints({
  endpoints: (build) => {
    const heroEndpoints = genericServiceEndpoints<
      Hero,
      GetHero,
      PostHero,
      PostHero
    >(build, `${controller}`);

    const favouriteHeroesEndpoints = favouriteEndpoints(build, controller);

    return {
      fetchHeroEntities: heroEndpoints.fetchEntities,
      fetchHeroEntity: heroEndpoints.fetchEntity,
      getFilteredHeroEntities: heroEndpoints.getFilteredEntities,
      createHeroEntity: heroEndpoints.createEntity,
      updateHeroEntity: heroEndpoints.updateEntity,
      deleteHeroEntity: heroEndpoints.deleteEntity,
      addHeroToFavourites: favouriteHeroesEndpoints.addToFavourites,
      removeHeroFromFavourites: favouriteHeroesEndpoints.removeFromFavourite,
    };
  },
});

export default heroService;
