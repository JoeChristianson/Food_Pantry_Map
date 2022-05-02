const sequelize = require('../config/connection');
const seedPantry = require('./pantry_seeds');
const seedRequest = require('./request_seeds');
const seedUser = require('./user_seeds');

const seedAll = async () => {
 
  await sequelize.sync({ force: true });

  await seedUser();

  await seedPantry();

  await seedRequest();



  process.exit(0);
};

seedAll();