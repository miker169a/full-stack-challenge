import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEvents } from "../hooks/useEvents";

const EventDetails = () => {
  let { id } = useParams();
  const { eventDetails, loading, error, loadEventDetails } = useEvents();

  useEffect(() => {
    if (id) {
      loadEventDetails(id); // Load the event details when the component mounts and when the ID changes
    }
  }, [id]);

  if (loading) return <div>Loading event details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!eventDetails) return <div>No event found</div>; // Or handle this case differently as per your UX/UI design

  return (
    <div>
      <h1>Event Details: {eventDetails.name}</h1>
      <p>Date: {eventDetails.date}</p>
      <p>Description: {eventDetails.description}</p>
      <h2>Tickets</h2>
      {eventDetails.tickets && eventDetails.tickets.length > 0 ? (
        <ul>
          {eventDetails.tickets.map((ticket) => (
            <li key={ticket.id}>
              <strong>{ticket.name}</strong> - {ticket.type} - ${ticket.price} +
              ${ticket.bookingFee} booking fee ({ticket.availability})
            </li>
          ))}
        </ul>
      ) : (
        <p>No tickets available.</p>
      )}
    </div>
  );
};

export default EventDetails;
