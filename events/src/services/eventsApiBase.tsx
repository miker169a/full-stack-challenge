import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

export const studentPortalApiBase = createApi({
  reducerPath: "eventsApi",
  tagTypes: ["Event"],
  baseQuery: retry(
    fetchBaseQuery({
      baseUrl: "http://localhost:3001/events",
    }),
    { maxRetries: 1 },
  ),
  endpoints: () => ({}),
});
