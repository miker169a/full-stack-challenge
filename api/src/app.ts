import express, { Express } from "express";
import { eventsRouter } from "./events/events.routes";
const app: Express = express();
// Had cors lib issues, so added this code
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
app.use(express.json());
app.use("/events", eventsRouter);

export default app;
