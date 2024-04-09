import request from "supertest"
import app from "../app"
import { Event } from "./event.model"
import { resetData } from "../db"

// ToDO: Add mocks

describe("Events Routes", () => {
    const newEvent: Event = {
        name: "New Year Celebration",
        date: "2024-12-31T23:59:00.000Z",
        description: "Celebrate the New Year with us!",
        tickets: [
            {
                name: "Adult Ticket",
                type: "adult",
                price: 50,
                bookingFee: 5,
                availability: "available",
            },
        ],
    }
    beforeAll(async () => {
        await resetData()
    })

    describe("POST /events", () => {
        it("should create an event and return it with a 201 status code", async () => {
            const response = await request(app).post("/events").send(newEvent)
            expect(response.statusCode).toBe(201)
            expect(response.body).toHaveProperty("id")
            expect(response.body.name).toBe(newEvent.name)
            expect(response.body.tickets).toBeInstanceOf(Array)
            expect(response.body.tickets[0]).toHaveProperty("id")
            expect(response.body.tickets[0]).toHaveProperty("eventId")
        })
    })

    describe("GET /events", () => {
        it("should return a list of events with a 200 status code", async () => {
            const response = await request(app).get("/events")
            expect(response.statusCode).toBe(200)
            expect(response.body).toBeInstanceOf(Array)
        })
    })

    describe("GET /events/:id", () => {
        it("should return a single event with a 200 status code", async () => {
            // TODO:  As I aint mock anything yet quick hack...
            const events = await request(app).get("/events")
            const newEvent = events.body[0]
            const eventResponse = await request(app).get(`/events/${newEvent.id}`)
            expect(eventResponse.statusCode).toBe(200)
            expect(eventResponse.body).toHaveProperty("id")
            expect(eventResponse.body.id).toBe(newEvent.id)
        })
    })

    describe("PUT /events/:id", () => {
        it("should update an event and return it with a 200 status code", async () => {
            const events = await request(app).get("/events")
            const newEvent = events.body[0]
            const eventResponse = await request(app).get(`/events/${newEvent.id}`)
            const eventResponseData = eventResponse.body
            const updatedEvent = {
                ...eventResponseData,
                name: "Updated New Year Celebration",
            }
            const response = await request(app)
                .put(`/events/${updatedEvent.id}`)
                .send(updatedEvent)

            expect(response.statusCode).toBe(200)
            expect(response.body.name).toEqual(updatedEvent.name)
        })
    })

    describe("DELETE /events/:id", () => {
        it("should delete an event and return a 204 status code", async () => {
            const events = await request(app).get("/events")
            const newEvent = events.body[0]
            const response = await request(app).delete(`/events/${newEvent.id}`)
            expect(response.statusCode).toBe(204)
        })
    })
})
