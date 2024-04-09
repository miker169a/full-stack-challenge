import express, { Express } from "express";
import * as swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from './routes';
const app: Express = express();
// Had cors lib issues, so added this code
//
const swaggerDocument = require('../api/swagger.json');

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
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
RegisterRoutes(app);

export default app;
