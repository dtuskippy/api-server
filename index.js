'use strict';

//since index.js, no need to call specific file after models below in require
const { sequelizeDatabase, DrinksModel } = require('./src/models');
const { start } = require('./src/server');

// create all associated tables and make sure connection is good
sequelizeDatabase.sync()
  .then(() => {
    console.log('Successful connection!');
    // DrinksModel.create({brand: 'Krusovice', category: 'beer', alcohol: 'alcohol'});
  })


  .catch(err => console.error(err));


start();

