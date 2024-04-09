import { Route, Controller, Post, Body, Get, Query, Path, Put, Delete, SuccessResponse, Response, Tags } from "tsoa"
import {
    createOrUpdateEvent,
    deleteEvent,
    findEvent,
    listEvents,
} from "./event.service"
import { Event } from "./event.model"
interface QueryParams {
  page?: number;
  limit?: number;
  filterType?: "name" | "description";
  filterValue?: string;
  sortBy?: keyof Event;
  order?: "asc" | "desc";
}

@Tags("Events")
@Route("events")
export class EventController extends Controller {
  @Post()
  @SuccessResponse("201", "Created") // This decorator is used to set the success response status code
    public async createEvent(@Body() event: Event): Promise<Event> {
        this.setStatus(201) // Set HTTP status code
        return createOrUpdateEvent(event)
    }

  @Get()
  public async getEvents(
    @Query() page?: number,
    @Query() limit?: number,
    @Query() filterType?: "name" | "description",
    @Query() filterValue?: string,
    @Query() sortBy?: keyof Event,
    @Query() order?: "asc" | "desc"
  ): Promise<{events: Event[], page: number, limit: number}> {
      return listEvents({ page, limit, filterType, filterValue, sortBy, order })
  }

  @Get("{id}")
  public async getEvent(@Path() id: string): Promise<Event | null> {
      const event = await findEvent(id)
      if (!event) {
          this.setStatus(404) // Not found
          return null
      }
      return event
  }

  @Put("{id}")
  public async updateEvent(@Path() id: string, @Body() eventData: Event): Promise<Event> {
      return createOrUpdateEvent(eventData, id)
  }

  @Delete("{id}")
  @SuccessResponse("204", "No Content")
  @Response("404", "Not Found")
  public async removeEvent(@Path() id: string): Promise<void> {
      const success = await deleteEvent(id)
      if (success) {
          this.setStatus(204)
          return
      } else {
          throw new Error("404, Event not found")
      }
  }
}

