'use strict';

const express = require('express');
const { DrinksModel } = require('../models');
const router = express.Router();

router.post('/drinks', async (req, res, send) => {
  console.log('req body', req.body);
  const newDrinks = await DrinksModel.create(req.body);
  res.status(200).send(newDrinks);

});

router.get('/drinks', async (req, res, next) => {
  const drinks = await DrinksModel.findAll();
  res.status(200).send(drinks);
});

router.get('/drinks/:id', async (req, res, next) => {
  let { id } = req.params;
  const drink = await DrinksModel.findOne({where: {id}});
  res.status(200).send(drink);
});

router.put('/drinks/:id', async (req, res, next) => {
  let { id } = req.params;
  await DrinksModel.update(req.body, {where: {id}});
  let drinks= await DrinksModel.findOne({where: {id}});
  res.status(200).send(drinks);
});

router.delete('/drinks/:id', async (req, res, next) => {
  let { id } = req.params;
  await DrinksModel.destroy({where: {id}});
  res.status(200).send('Drinks entry has been removed');
});

module.exports = router;





