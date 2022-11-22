import { News, PostNews, UpdateNews } from "../../types/entites/news.types";
import apiService, { genericServiceEndpoints } from "../api.service";

const controller: string = "News";

const newsService = apiService.injectEndpoints({
  endpoints: (build) => {
    const newsEndpoints = genericServiceEndpoints<
      News,
      News,
      PostNews,
      UpdateNews
    >(build, `${controller}`);

    return {
      fetchNewsEntities: newsEndpoints.fetchEntities,
      fetchNewsEntity: newsEndpoints.fetchEntity,
      getFilteredNewsEntities: newsEndpoints.getFilteredEntities,
      createNewsEntity: newsEndpoints.createEntity,
      updateNewsEntity: newsEndpoints.updateEntity,
      deleteNewsEntity: newsEndpoints.deleteEntity,
    };
  },
});

export default newsService;
