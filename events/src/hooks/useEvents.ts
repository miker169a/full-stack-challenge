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

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [eventDetails, setEventDetails] = useState<Event | null>(null);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/events"); // Update the URL as per your API endpoint
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setEvents(data);
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
