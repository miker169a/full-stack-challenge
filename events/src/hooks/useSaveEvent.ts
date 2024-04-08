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

export const useSaveEvent = () => {
  const [error, setError] = useState<Error | null>(null);

  // Example function that might fail
  const saveEvent = async (eventData: Event) => {
    try {
      const response = await fetch("http://localhost:3001/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });
      if (!response.ok) {
        console.log("response", response);
        throw new Error("Failed to save the event");
      }

      const data = await response.json();
      console.log("data", data);
      return data;
    } catch (error) {
      if (error instanceof Error) setError(error);
      else
        setError(
          new Error("An unknown error occurred. Please try again later."),
        );
      console.log("error", error);
    }
  };

  return { error, saveEvent };
};
