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
            title: 'Student Portal',
            description: 'The API of student portal',
        },
    },
    apis: ['router.js'],
};

app.use(logger('dev'));
app.use(helmet());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

const specs = swaggerJsdoc(swaggerOptions);
const swaggerUi = require('swagger-ui-express');

app.use('/api/v1/student_portal/swagger', swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/v1/student_portal", router);

app.listen(process.env.PORT || 3000);
