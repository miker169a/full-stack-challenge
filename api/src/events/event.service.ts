import { Event, Ticket } from "./event.model";
import { assoc, map, pipe } from "ramda";
import { v4 as uuidv4 } from "uuid";
import { readData, writeData } from "../db";

export async function createOrUpdateEvent(
  event: Event,
  eventId?: string | null,
): Promise<Event> {
  if (eventId) {
    const events = await readData();
    const index = events.findIndex((event: Event) => event.id === eventId);
    if (index === -1) {
      throw new Error("Event not found");
    }
    events[index] = { ...events[index], ...event };
    // ToDo: add ids to new tickets
    await writeData(events);
    return events[index];
  }
  const newEventId = uuidv4();

  const assignIdsToTicket = (ticket: Ticket) =>
    pipe(assoc("id", uuidv4()), assoc("eventId", newEventId))(ticket);

  const processedTickets = map(assignIdsToTicket, event.tickets || []);

  const newEvent = pipe(
    assoc("id", newEventId),
    assoc("tickets", processedTickets),
  )(event);

  const events = await readData();

  events.push(newEvent);
  await writeData(events);
  console.log("Event created:", newEvent);
  return newEvent;
}

export async function listEvents(): Promise<Event[]> {
  const events = await readData();
  return events;
}

export async function findEvent(id: string): Promise<Event | undefined> {
  const events = await readData();
  console.log(events);
  console.log(
    "Event found:",
    events.find((event: Event) => event.id === id),
  );
  return events.find((event: Event) => event.id === id);
}

export async function deleteEvent(eventId: string) {
  const events = await readData();
  const eventIndex = events.findIndex((event: Event) => event.id === eventId);

  if (eventIndex > -1) {
    events.splice(eventIndex, 1);
    await writeData(events);
    return true;
  } else {
    return false;
  }
}
