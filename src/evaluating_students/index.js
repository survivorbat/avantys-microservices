const express = require("express");
const logger = require("morgan");
const bodyparser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");

const studentsRoute = require("./routes/students");
const teachersRoute = require("./routes/teachers");
const rabbitRoute = require("./routes/rabbit");
const testsRoute = require("./routes/tests");

const rabbit = require("./rabbit/rabbot");
// const rabbitHandler = require("./rabbit/messageHandler");

const app = express();
const port = process.env.PORT || 3000;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Student Evaluation",
      description: "The API of the student evaluation",
      produces: ["application/json"],
      schemes: ["https"]
    },
    host: process.env.SWAGGER_BASE_URL
  },
  apis: [
    "/app/routes/students.js",
    "/app/routes/teachers.js",
    "/app/routes/tests.js"
  ]
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

app.use("/api/v1/evaluating_students/tests", testsRoute);
// app.use("/api/v1/evaluating_students/teachers", teachersRoute);
// app.use("/api/v1/evaluating_students/students", studentsRoute);
app.use("/api/v1/evaluating_students/rabbit", rabbitRoute);

app.listen(port, () =>
  console.log(`Evaluating students container listening on port ${port}!`)
);
