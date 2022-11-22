import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseEntity } from "../types/entites/base.types";
import { ReqProcessed, ResProcessed } from "../types/request.types";
import { prepareReqParams } from "../utils/params.utils";

import { baseQueryWithSession } from "./authQuery.service";

const apiService = createApi({
  reducerPath: "api/service",
  baseQuery: baseQueryWithSession(),
  tagTypes: ["Movies", "User", "News"],
  endpoints: (build) => ({}),
});

export const genericServiceEndpoints = <
  TEntity extends BaseEntity,
  TGet,
  TPost,
  TUpdate
>(
  build: Builder,
  entityName: string
) => {
  return {
    fetchEntities: build.query<TGet[], void>({
      query: () => ({
        url: `/${entityName}`,
      }),

      providesTags: (result) => [entityName],
    }),

    fetchEntity: build.query<TEntity, number>({
      query: (id) => ({
        url: `/${entityName}/${id}`,
      }),

      providesTags: (result) => [{ type: entityName, id: result?.id }],
    }),

    getFilteredEntities: build.mutation<ResProcessed<TGet>, ReqProcessed>({
      query: (arg) => ({
        url: `/${entityName}/Filter`,
        body: arg.filters,
        method: "POST",
        params: prepareReqParams(arg),
      }),
    }),

    createEntity: build.mutation<BaseEntity, TPost>({
      query: (arg) => ({
        url: `/${entityName}`,
        body: arg,
        method: "POST",
      }),

      invalidatesTags: (result) => [entityName],
    }),

    updateEntity: build.mutation<BaseEntity, { id: number; entity: TUpdate }>({
      query: ({ id, entity }) => ({
        url: `/${entityName}/${id}`,
        body: entity,
        method: "PUT",
      }),

      invalidatesTags: (result) => [{ type: entityName, id: result?.id }],
    }),

    deleteEntity: build.mutation<void, number>({
      query: (id) => ({
        url: `/${entityName}/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: (result) => [entityName],
    }),
  };
};

export const favouriteEndpoints = (build: Builder, entityName: string) => ({
  addToFavourites: build.mutation<void, number>({
    query: (id) => ({
      url: `/${entityName}/Favourite/${id}`,
      method: "POST",
    }),
  }),

  removeFromFavourite: build.mutation<void, number>({
    query: (id) => ({
      url: `/${entityName}/Favourite/${id}`,
      method: "DELETE",
    }),
  }),
});

export type Builder = EndpointBuilder<any, any, any>;

export type ServiceEndpoints = (build: Builder) => {};

export default apiService;
