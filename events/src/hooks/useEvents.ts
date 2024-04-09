import { useState } from "react";

export interface Ticket {
  id?: string;
  eventId?: string;
  name: string;
  type: string;
  price: number;
  bookingFee: number;
  availability: "available" | "sold out";
}

export interface Event {
  id?: string;
  name: string;
  date: string;
  description: string;
  tickets?: Ticket[];
}

interface LoadEventsParams {
  requestedPage?: number;
  requestedLimit?: number;
  filterType?: keyof Event;
  filterValue?: string;
  sortBy?: keyof Event;
  order?: "asc" | "desc";
}

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [eventDetails, setEventDetails] = useState<Event | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);

  const loadEvents = async ({
    requestedPage = page,
    requestedLimit = limit,
    filterType,
    filterValue,
    sortBy,
    order,
  }: LoadEventsParams = {}) => {
    try {
      setLoading(true);
      let queryString = `page=${requestedPage}&limit=${requestedLimit}`;

      if (filterType && filterValue) {
        queryString += `&filterType=${encodeURIComponent(filterType)}&filterValue=${encodeURIComponent(filterValue)}`;
      }

      if (sortBy && order) {
        queryString += `&sortBy=${sortBy}&order=${order}`;
      }
      const response = await fetch(
        `http://localhost:3001/events?${queryString}`,
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setEvents(data.events || []);
      setPage(requestedPage);
      setLimit(requestedLimit);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const loadEventDetails = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/events/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setEventDetails(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { events, loading, error, loadEvents, loadEventDetails, eventDetails };
};
