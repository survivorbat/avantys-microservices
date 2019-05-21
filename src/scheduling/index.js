const express = require("express");
const logger = require("morgan");
const bodyparser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const router = require("./router");
const app = express();

const rabbit = require("./rabbit/rabbot");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Scheduling",
      description: "The API of scheduling"
    },
    basePath: "/api/v1/scheduling",
    produces: ["application/json"],
    schemes: ["https"]
  },
  apis: ["/app/router.js"]
};

app.use(logger("dev"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const specs = swaggerJsdoc(swaggerOptions);
const swaggerUi = require("swagger-ui-express");

app.use("/api/v1/scheduling/swagger", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/v1/scheduling", router);

app.listen(process.env.PORT || 3000);
