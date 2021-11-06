const Sequelize = require('sequelize');

const connection = new Sequelize('guiapress', 'root', '123456', {
  host: 'mysql',
  dialect: 'mysql',
  timezone: '-03:00',
  retry: {
    max: Infinity,
  },
});

module.exports = connection;
