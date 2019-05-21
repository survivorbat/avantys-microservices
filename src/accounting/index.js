const express = require("express");
const logger = require("morgan");
const bodyparser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const router = require("./router");
const app = express();
const axon = require('axon');
const sock = axon.socket('push');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Accounting",
      description: "The API of accounting"
    },
    host: process.env.SWAGGER_BASE_URL
  },
  apis: ["/app/router.js"]
};

let axonserver = sock.bind(`tcp://${process.env.AXON_HOST}:8024`)
sock.send('hello');

console.log(axonserver)

app.use(logger("dev"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const specs = swaggerJsdoc(swaggerOptions);
const swaggerUi = require("swagger-ui-express");

app.use("/api/v1/accounting/swagger", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/v1/accounting", router);

app.listen(process.env.PORT || 3000);
