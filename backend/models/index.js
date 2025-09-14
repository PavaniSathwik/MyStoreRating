const User = require('./User');
const Store = require('./Store');
const Rating = require('./Rating');

const syncModels = async () => {
  const { sequelize } = require('../config/db');
  try {
    await sequelize.sync({ alter: true }); // auto-create/update tables
    console.log('✅ All models synced');
  } catch (err) {
    console.error('❌ Error syncing models:', err);
  }
};

module.exports = { User, Store, Rating, syncModels };
