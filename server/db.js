const { Sequelize } = require('sequelize');
const path = require('path');
const os = require('os');

const storagePath = path.join(os.homedir(), '.hoshino/clanbattle.db');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = { sequelize }
