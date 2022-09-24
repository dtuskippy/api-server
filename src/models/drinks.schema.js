'use strict';

module.exports = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define('drinks', {
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM,
      values: ['beer','wine','soft drinks'],
      allowNull: false,
    },
    alcohol: {
      type: DataTypes.ENUM,
      values: ['alcohol','non-alcohol'],
      allowNull: true,
    },
  });
};
