const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const router = require('./router');
const app = express();

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Recruiting',
            description: 'The API of recruiting',
        },
    },
    apis: ['router.js'],
};

const specs = swaggerJsdoc(swaggerOptions);
const swaggerUi = require('swagger-ui-express');

app.use('/api/v1/recruiting', swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/v1/recruiting", router);

app.listen(process.env.PORT || 3000);
