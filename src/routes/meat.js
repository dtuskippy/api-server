'use strict';

const express = require('express');
const { MeatModel } = require('../models');
const router = express.Router();

router.post('/meat', async (req, res, send) => {
  console.log('req body', req.body);
  const newMeat = await MeatModel.create(req.body);
  res.status(200).send(newMeat);
});

router.get('/meat', async (req, res, next) => {
  const meats = await MeatModel.findAll();
  res.status(200).send(meats);
});

router.get('/meat/:id', async (req, res, next) => {
  let { id } = req.params;
  const meat = await MeatModel.findOne({where: {id}});
  res.status(200).send(meat);
});

router.put('/meat/:id', async (req, res, next) => {
  let { id } = req.params;
  await MeatModel.update(req.body, {where: {id}});
  let meat = await MeatModel.findOne({where: {id}});
  res.status(200).send(meat);
});

router.delete('/meat/:id', async (req, res, next) => {
  let { id } = req.params;
  await MeatModel.destroy({where: {id}});
  res.status(200).send('Meat entry has been removed');
});

module.exports = router;



