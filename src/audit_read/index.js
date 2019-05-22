const express = require("express");
const logger = require("morgan");
const bodyparser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");

const eventsRoute = require("./routes/events");

const app = express();
const port = process.env.PORT || 3000;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Audit read",
      description: "The API of the audit read"
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
  "/api/v1/audit_read/swagger",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.use("/api/v1/audit_read", eventsRoute);

app.listen(port, () =>
  console.log(`Audit read container listening on port ${port}!`)
);
