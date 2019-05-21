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
      title: "Recruiting",
      description: "The API of recruiting",
      produces: ["application/json"],
      schemes: ["https"]
    },
    host: process.env.SWAGGER_BASE_URL
  },
  apis: ["/app/router.js"]
};

app.use(logger("dev"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const specs = swaggerJsdoc(swaggerOptions);
const swaggerUi = require("swagger-ui-express");

app.use("/api/v1/recruiting/swagger", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/v1/recruiting", router);

app.listen(process.env.PORT || 3000);
