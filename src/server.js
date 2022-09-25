'use strict';

const express = require('express');
const drinksRouter = require('./routes/drinks');
const meatRouter = require('./routes/meat');
const notFound = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const logger = require('./middleware/logger');


const PORT = process.env.PORT || 3002;

const app = express();

app.use(logger);

app.get('/', (req, res, next) => {
  res.status(200).send('Hello, welcome to the World of Meat and Drinks!');
});

app.use(express.json());

app.use(drinksRouter);
app.use(meatRouter);

app.use('*', notFound);
app.use(errorHandler);

function start(){
  app.listen(PORT, () => console.log('Listening on port', PORT));
}

module.exports = { app, start };
