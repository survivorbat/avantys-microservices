const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const bodyparser = require('body-parser');
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
    apis: ['/app/router.js'],
};

app.use(logger('dev'));
app.use(helmet());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

const specs = swaggerJsdoc(swaggerOptions);
const swaggerUi = require('swagger-ui-express');

app.use('/api/v1/guiding_students/swagger', swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/v1/guiding_students", router);

app.listen(process.env.PORT || 3000);
