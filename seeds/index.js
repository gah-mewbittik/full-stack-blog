const sequelize = require('../config/connection');
const seedGallery = require('./galleryData');
const seedPosts = require('./postData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

// TODO: ADD function data here from seed files' data
await seedPosts();

  process.exit(0);
};

seedAll();