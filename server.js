require('./models/db');

const express = require('express');
const swaggerUi = require('swagger-ui-express')
const swaggerFile= require('./swagger_output.json')
const sceController = require('./controllers/scheduleController.js');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var options = {
    swaggerOptions: {
      authAction :{ JWT: {name: "JWT", schema: {type: "apiKey", in: "header", name: "Authorization", description: ""}, value: "Bearer <JWT>"} }
    }
    };
  app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile,options))
 
  app.use('/schedule',sceController);

app.listen(3000, () => {
  console.log('Express server started at port : 3000');
});

