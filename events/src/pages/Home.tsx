import EventForm from "../components/EventForm/EventForm";
import { useSaveEvent } from "../hooks/useSaveEvent";
import { redirect } from "react-router-dom";

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
export const Home = () => {
  const { saveEvent } = useSaveEvent();

  const submitEvent = async (event: Event) => {
    await saveEvent(event);
    return redirect("/events");
  };

  return (
    <div>
      <h1>Home</h1>
      <EventForm onSubmit={submitEvent} />
    </div>
  );
};
