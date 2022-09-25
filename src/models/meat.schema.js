'use strict';

module.exports = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define('meat', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM,
      values: ['lunch meat','poultry','beef', 'pork', 'fish'],
      allowNull: false,
    },
    freshness: {
      type: DataTypes.ENUM,
      values: ['frozen','fresh'],
      allowNull: true,
    },
  });
};
