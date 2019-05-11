const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const router = require('./router');
const app = express();

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Student Portal',
            description: 'The API of student portal',
        },
    },
    apis: ['router.js'],
};

const specs = swaggerJsdoc(swaggerOptions);
const swaggerUi = require('swagger-ui-express');

app.use('/api/v1/student_portal', swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/v1/student_portal", router);

app.listen(process.env.PORT || 3000);
