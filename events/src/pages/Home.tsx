import EventForm from "../components/EventForm/EventForm";
import { useSaveEvent } from "../hooks/useSaveEvent";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const submitEvent = async (event: Event) => {
    const data: Event = await saveEvent(event);
    navigate(`/events/${data.id}`);
  };

  return (
    <div>
      <EventForm onSubmit={submitEvent} />
    </div>
  );
};
