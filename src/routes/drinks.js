'use strict';

const express = require('express');
const { drinksInterface } = require('../models');
const router = express.Router();

router.post('/drinks', async (req, res, send) => {
  console.log('req body', req.body);
  const newDrinks = await drinksInterface.create(req.body);
  res.status(200).send(newDrinks);
});

router.get('/drinks', async (req, res, next) => {
  const drinks = await drinksInterface.read();
  res.status(200).send(drinks);
});

router.get('/drinks/:id', async (req, res, next) => {
  let { id } = req.params;
  const drink = await drinksInterface.read(id);
  res.status(200).send(drink);
});

router.put('/drinks/:id', async (req, res, next) => {
  let { id } = req.params;
  await drinksInterface.update(req.body, id);
  let drink = await drinksInterface.read(id);
  res.status(200).send(drink);
});

router.delete('/drinks/:id', async (req, res, next) => {
  let { id } = req.params;
  await drinksInterface.delete(id);
  res.status(200).send('Drinks entry has been removed');
});

module.exports = router;





