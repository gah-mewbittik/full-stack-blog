const { Post } = require('../models');

const postData = [
  {
    title: 'Sequelize to Realize',
    description: 'Wow, sequelize is so useful!',
    post_date: '8/8/2023',
    blog_id: 1,
  },
  {
    
  },

];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
