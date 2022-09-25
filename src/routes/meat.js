'use strict';

const express = require('express');
const { meatInterface } = require('../models');
const router = express.Router();

router.post('/meat', async (req, res, send) => {
  console.log('req body', req.body);
  const newMeat = await meatInterface.create(req.body);
  res.status(200).send(newMeat);
});

router.get('/meat', async (req, res, next) => {
  const meats = await meatInterface.read();
  res.status(200).send(meats);
});

router.get('/meat/:id', async (req, res, next) => {
  let { id } = req.params;
  const meat = await meatInterface.read(id);
  res.status(200).send(meat);
});

router.put('/meat/:id', async (req, res, next) => {
  let { id } = req.params;
  await meatInterface.update(req.body, id);
  let meat = await meatInterface.read(id);
  res.status(200).send(meat);
});

router.delete('/meat/:id', async (req, res, next) => {
  let { id } = req.params;
  await meatInterface.delete(id);
  res.status(200).send('Meat entry has been removed');
});

module.exports = router;



