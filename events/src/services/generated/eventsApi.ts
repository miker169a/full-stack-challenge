/* eslint-disable */
/**
 * WARNING: This file is automatically generated.
 * Any manual changes will be overwritten.
 */
import { eventsApiBase as api } from "../eventsApiBase";
export const addTagTypes = ["Events"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      createEvent: build.mutation<CreateEventApiResponse, CreateEventApiArg>({
        query: (queryArg) => ({
          url: `/events`,
          method: "POST",
          body: queryArg.event,
        }),
        invalidatesTags: ["Events"],
      }),
      getEvents: build.query<GetEventsApiResponse, GetEventsApiArg>({
        query: (queryArg) => ({
          url: `/events`,
          params: {
            page: queryArg.page,
            limit: queryArg.limit,
            filterType: queryArg.filterType,
            filterValue: queryArg.filterValue,
            sortBy: queryArg.sortBy,
            order: queryArg.order,
          },
        }),
        providesTags: ["Events"],
      }),
      getEvent: build.query<GetEventApiResponse, GetEventApiArg>({
        query: (queryArg) => ({ url: `/events/${queryArg.id}` }),
        providesTags: ["Events"],
      }),
      updateEvent: build.mutation<UpdateEventApiResponse, UpdateEventApiArg>({
        query: (queryArg) => ({
          url: `/events/${queryArg.id}`,
          method: "PUT",
          body: queryArg.event,
        }),
        invalidatesTags: ["Events"],
      }),
      removeEvent: build.mutation<RemoveEventApiResponse, RemoveEventApiArg>({
        query: (queryArg) => ({
          url: `/events/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Events"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as eventsApi };
export type CreateEventApiResponse = /** status 201 Created */ Event;
export type CreateEventApiArg = {
  event: Event;
};
export type GetEventsApiResponse = /** status 200 Ok */ Event[];
export type GetEventsApiArg = {
  page?: number;
  limit?: number;
  filterType?: "name" | "description";
  filterValue?: string;
  sortBy?: "id" | "name" | "date" | "description" | "tickets";
  order?: "asc" | "desc";
};
export type GetEventApiResponse = /** status 200 Ok */ Event | null;
export type GetEventApiArg = {
  id: string;
};
export type UpdateEventApiResponse = /** status 200 Ok */ Event;
export type UpdateEventApiArg = {
  id: string;
  event: Event;
};
export type RemoveEventApiResponse = unknown;
export type RemoveEventApiArg = {
  id: string;
};
export type Ticket = {
  id?: string;
  eventId?: string;
  name: string;
  type: string;
  price: number;
  bookingFee: number;
  availability: "available" | "sold out";
};
export type Event = {
  id?: string;
  name: string;
  date: string;
  description: string;
  tickets?: Ticket[];
};
export const {
  useCreateEventMutation,
  useGetEventsQuery,
  useGetEventQuery,
  useUpdateEventMutation,
  useRemoveEventMutation,
} = injectedRtkApi;