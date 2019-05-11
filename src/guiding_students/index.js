const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const router = require('./router');
const app = express();

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Guiding students',
            description: 'The API of guiding students',
        },
    },
    apis: ['router.js'],
};

const specs = swaggerJsdoc(swaggerOptions);
const swaggerUi = require('swagger-ui-express');

app.use('/api/v1/guiding_students', swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/v1/guiding_students", router);

app.listen(process.env.PORT || 3000);
