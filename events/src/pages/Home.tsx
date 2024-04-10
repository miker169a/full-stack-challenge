import EventForm from "../components/EventForm/EventForm";
import { useNavigate } from "react-router-dom";
import { Event, useCreateEventMutation } from "../services/generated/eventsApi";

export const Home = () => {
  const [createEvent] = useCreateEventMutation();
  const navigate = useNavigate();

  const submitEvent = async (event: Event) => {
    try {
      const data: Event = await createEvent({ event }).unwrap();
      console.log(data);
      navigate(`/events/${data.id}`);
    } catch (error) {
      console.error("Failed to create event", error);
    }
  };

  return (
    <div>
      <EventForm onSubmit={submitEvent} />
    </div>
  );
};
