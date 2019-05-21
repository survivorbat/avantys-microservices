const express = require("express");
const logger = require("morgan");
const bodyparser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const router = require("./router");
const app = express();
// const es = require("eventstore")({
//   type: "mongodb",
//   host: process.env.EVENTSTORE_HOST,
//   port: 27017
// });

const rabbit = require("./rabbit/rabbot");

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

// es.getEventStream("streamId", (err, stream) => {
//   stream.addEvent({ my: "event" });
//   stream.addEvents([{ my: "event2" }]);

//   stream.commit();

//   // or

//   stream.commit((err, stream) => {
//     console.log(stream.eventsToDispatch); // this is an array containing all added events in this commit.
//   });
// });

app.use(logger("dev"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const specs = swaggerJsdoc(swaggerOptions);
const swaggerUi = require("swagger-ui-express");

app.use("/api/v1/accounting/swagger", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/v1/accounting", router);

app.listen(process.env.PORT || 3000);
