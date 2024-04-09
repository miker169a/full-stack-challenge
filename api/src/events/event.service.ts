import { Event, Ticket } from "./event.model";
import { assoc, map, pipe } from "ramda";
import { v4 as uuidv4 } from "uuid";
import { readData, writeData } from "../db";

interface ListEventsParams {
  page?: number;
  limit?: number;
  filterType?: "name" | "description"; // Allows filtering by any Event field
  filterValue?: string;
  sortBy?: keyof Event; // Allows sorting by any Event field
  order?: "asc" | "desc";
}

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
    // ToDo: add ids to new tiggckets
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

export async function listEvents({
  page = 1,
  limit = 20,
  filterType,
  filterValue,
  sortBy,
  order = "asc",
}: ListEventsParams): Promise<Event[]> {
  let events: Event[] = await readData();

  if (filterType && filterValue) {
    events = events.filter((event) =>
      filterType && filterValue
        ? event[filterType].toLowerCase().includes(filterValue.toLowerCase())
        : true,
    );
  }

  if (sortBy && events[0][sortBy]) {
    events.sort((a: Event, b: Event) => {
      if (String(a[sortBy]) < String(b[sortBy]))
        return order === "asc" ? -1 : 1;
      if (String(a[sortBy]) > String(b[sortBy]))
        return order === "asc" ? 1 : -1;
      return 0;
    });
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return events.slice(startIndex, endIndex);
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
