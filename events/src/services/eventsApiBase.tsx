import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

export const eventsApiBase = createApi({
  reducerPath: "eventsApi",
  tagTypes: ["Event"],
  baseQuery: retry(
    fetchBaseQuery({
      baseUrl: "http://localhost:3001",
    }),
    { maxRetries: 1 },
  ),
  endpoints: () => ({}),
});
