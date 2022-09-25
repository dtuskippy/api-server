'use strict';

const supertest = require('supertest');
const { app } = require('../src/server');
const { sequelizeDatabase } = require('../src/models');
const request = supertest(app);

// before test, synching database
beforeAll(async () => {
  await sequelizeDatabase.sync();
});

// after test, dropping mock
afterAll(async () => {
  await sequelizeDatabase.drop();
});


describe('Testing REST API for drinks', () => {

  test('Create a drinks', async() => {
    let response1 = await request.post('/drinks').send({
      brand: 'tester',
      category: 'wine',
      alcohol: 'non-alcohol',
    });

    let response2 = await request.post('/drinks').send({
      brand: 'tester2',
      category: 'beer',
      alcohol: 'alcohol',
    });

    expect(response1.status).toEqual(200);
    expect(response1.body.brand).toEqual('tester');
    expect(response1.body.category).toEqual('wine');
    expect(response1.body.alcohol).toEqual('non-alcohol');
    expect(response2.status).toEqual(200);
    expect(response2.body.brand).toEqual('tester2');
    expect(response2.body.category).toEqual('beer');
    expect(response2.body.alcohol).toEqual('alcohol');
  });


  test('Reads all drinks', async () => {
    let response = await request.get('/drinks');
    console.log('Should have two records', response.body);
    expect(response.body.length).toBe(2);
    expect(response.body[0].brand).toEqual('tester');
    expect(response.body[0].category).toEqual('wine');
    expect(response.body[0].alcohol).toEqual('non-alcohol');
    expect(response.body[1].brand).toEqual('tester2');
    expect(response.body[1].category).toEqual('beer');
    expect(response.body[1].alcohol).toEqual('alcohol');

  });

  test('Reads a single drink', async () => {
    let response = await request.get('/drinks/1');

    expect(response.body.brand).toEqual('tester');
    expect(response.body.category).toEqual('wine');
    expect(response.body.alcohol).toEqual('non-alcohol');
  });

  test('Updates a drink', async () => {
    let response = await request.put('/drinks/1').send({
      brand: 'tester',
      category: 'beer',
      alcohol: 'non-alcohol',
    });

    expect(response.body.brand).toEqual('tester');
    expect(response.body.category).toEqual('beer');
    expect(response.body.alcohol).toEqual('non-alcohol');
  });


  test('Should delete a drinks', async () => {
    await request.delete('/drinks/1');
    let response = await request.get('/drinks');
    console.log('Should have one record', response.body);

    expect(response.body.length).toBe(1);
    expect(response.body[0].brand).toEqual('tester2');
    expect(response.body[0].category).toEqual('beer');
    expect(response.body[0].alcohol).toEqual('alcohol');
  });

});

describe('Testing REST API for meat', () => {

  test('Create a meat', async() => {
    let response1 = await request.post('/meat').send({
      name: 'tester',
      category: 'pork',
      freshness: 'fresh',
    });

    let response2 = await request.post('/meat').send({
      name: 'tester2',
      category: 'beef',
      freshness: 'frozen',
    });

    expect(response1.status).toEqual(200);
    expect(response1.body.name).toEqual('tester');
    expect(response1.body.category).toEqual('pork');
    expect(response1.body.freshness).toEqual('fresh');
    expect(response2.status).toEqual(200);
    expect(response2.body.name).toEqual('tester2');
    expect(response2.body.category).toEqual('beef');
    expect(response2.body.freshness).toEqual('frozen');
  });


  test('Reads all meat', async () => {
    let response = await request.get('/meat');
    console.log('Should have two records', response.body);
    expect(response.body.length).toBe(2);
    expect(response.body[0].name).toEqual('tester');
    expect(response.body[0].category).toEqual('pork');
    expect(response.body[0].freshness).toEqual('fresh');
    expect(response.body[1].name).toEqual('tester2');
    expect(response.body[1].category).toEqual('beef');
    expect(response.body[1].freshness).toEqual('frozen');
  });

  test('Reads a single meat', async () => {
    let response = await request.get('/meat/1');
    expect(response.body.name).toEqual('tester');
    expect(response.body.category).toEqual('pork');
    expect(response.body.freshness).toEqual('fresh');
  });

  test('Updates a meat', async () => {
    let response = await request.put('/meat/1').send({
      name: 'tester',
      category: 'fish',
      freshness: 'fresh',
    });

    expect(response.body.name).toEqual('tester');
    expect(response.body.category).toEqual('fish');
    expect(response.body.freshness).toEqual('fresh');
  });


  test('Should delete a meat', async () => {
    await request.delete('/meat/1');
    let response = await request.get('/meat');
    console.log('Should have one record', response.body);

    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toEqual('tester2');
    expect(response.body[0].category).toEqual('beef');
    expect(response.body[0].freshness).toEqual('frozen');
  });

});

