const express = require("express");
const logger = require("morgan");
const bodyparser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const router = require("./router");
const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Student Administration",
      description: "The API of the student administration"
    }
  },
  apis: ["/app/router.js"]
};

app.use(logger("dev"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const specs = swaggerJsdoc(swaggerOptions);
const swaggerUi = require("swagger-ui-express");

app.use(
  "/api/v1/student_administration/swagger",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.use("/api/v1/student_administration", router);

app.listen(process.env.PORT || 3000);
