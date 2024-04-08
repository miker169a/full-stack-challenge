import { useEffect } from "react";
import { useEvents } from "../hooks/useEvents"; // Adjust the import path as needed
import { Link } from "react-router-dom";
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

function EventList() {
  const { events, loading, error, loadEvents } = useEvents();

  useEffect(() => {
    loadEvents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Events</h1>
      <ul>
        {events.map((event: Event) => (
          <li key={event.id}>
            <Link to={`/events/${event.id}`}>
              <div>
                <span>
                  <strong>Name:</strong> {event.name}
                </span>
              </div>
              <div>
                <span>
                  <strong>Description:</strong> {event.description}
                </span>
              </div>
              <div>
                <span>
                  <strong>Date:</strong> {event.date}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;
