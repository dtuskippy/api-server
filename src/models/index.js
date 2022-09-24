'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const drinksSchema = require('./drinks.schema');
const meatSchema = require('./meat.schema');

// 'postgres://localhost:5432/api-app'
// 'postgres://username:password@localhost:5432/api-app'
// no need to bring in sqlite memory

const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite:memory'
  : process.env.DATABASE_URL;




// instantiates database (create an instance/singleton)
const sequelizeDatabase = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// create DrinksModel with our Schema
const DrinksModel = drinksSchema(sequelizeDatabase, DataTypes);
const MeatModel = meatSchema(sequelizeDatabase, DataTypes);

module.exports = {sequelizeDatabase, DrinksModel, MeatModel};







