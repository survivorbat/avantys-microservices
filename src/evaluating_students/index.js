const express = require("express");
const logger = require("morgan");
const bodyparser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const router = require("./router");
const app = express();
const port = process.env.PORT || 3000;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Student Evaluation",
      description: "The API of the student evaluation"
    },
    host: "localhost/api/v1/evaluating_students",
  },
  apis: ["/app/router.js"]
};

app.use(logger("dev"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const specs = swaggerJsdoc(swaggerOptions);
const swaggerUi = require("swagger-ui-express");

app.use(
  "/api/v1/evaluating_students/swagger",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.use("/api/v1/evaluating_students", router);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

