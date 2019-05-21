const express = require("express");
const logger = require("morgan");
const bodyparser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const rabbit = require("./rabbit/rabbot");

const eventsRoute = require("./routes/events");

const app = express();
const port = process.env.PORT || 3000;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Student Evaluation",
      description: "The API of the student evaluation"
    },
    host: process.env.SWAGGER_BASE_URL
  },
  apis: ["/app/routes/events.js"]
};

app.use(logger("dev"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const specs = swaggerJsdoc(swaggerOptions);
const swaggerUi = require("swagger-ui-express");

app.use(
  "/api/v1/audit_write/swagger",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.use("/api/v1/audit_write/events", eventsRoute);


app.listen(port, () =>
  console.log(`Evaluating students container listening on port ${port}!`)
);
