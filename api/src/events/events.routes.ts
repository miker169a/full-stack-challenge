import express, { Request, Response } from "express";
import {
  createOrUpdateEvent,
  deleteEvent,
  findEvent,
  listEvents,
} from "./event.service";
import { Event } from "./event.model";
interface QueryParams {
  page?: string;
  limit?: string;
  filterType?: "name" | "description";
  filterValue?: string;
  sortBy?: keyof Event;
  order?: "asc" | "desc";
}

export const eventsRouter = express.Router();

eventsRouter.post("/", async (req: Request, res: Response) => {
  const event: Event = req.body;

  if (
    !event.name ||
    !event.date ||
    !event.description ||
    !Array.isArray(event.tickets)
  ) {
    return res
      .status(400)
      .json({ message: "Missing required fields or incorrect format" });
  }

  const newEvent = await createOrUpdateEvent(event);

  res.status(201).json(newEvent);
});

eventsRouter.get("/", async (req: Request, res: Response) => {
  const { page, limit, filterType, filterValue, sortBy, order }: QueryParams =
    req.query;

  try {
    const events = await listEvents({
      page: page ? parseInt(page) : undefined,
      limit: limit ? parseInt(limit) : undefined,
      filterType,
      filterValue,
      sortBy,
      order,
    });
    res.json({ events, page, limit });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving events" });
  }
});

eventsRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const event = await findEvent(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving event" });
  }
});

eventsRouter.put("/:id", async (req, res) => {
  const eventId = req.params.id;
  const eventData = req.body;

  try {
    const updatedEvent = await createOrUpdateEvent(eventData, eventId);
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("Error updating/creating event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

eventsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const success = await deleteEvent(id);
    if (success) {
      res.status(204).send(); // No Content
    } else {
      res.status(404).json({ message: "Event not found" }); // Not Found
    }
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
