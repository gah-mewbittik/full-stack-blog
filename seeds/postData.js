const { Post } = require('../models');

const postData = [
  {
    title: 'Sequelize to Realize',
    description: 'Wow, sequelize is so useful!',
    post_date: '8/8/2023',
    featured: true,           
  },
  {
    title: 'Front-end mastery',
    description: 'To master font-end visit w3schools site and read documentation. Do not forget to practice, practice, and practice',
    post_date: '6/6/2023',
    featured: true, 
  },
  {
    title: 'Full-Stack mastery',
    description: 'Practice, practice, practice, practice, practice, and did I mention practice',
    post_date: '5/5/2023',
    featured: false, 
  },
  {
    title: 'New Era of Development',
    description: 'With the new developments in AI, we enter a world of creativity or doom?',
    post_date: '5/4/2023',
    featured: false,
  },
  {
    title: 'To Sequelize or Not to Sequelize is the question?',
    description: 'Sequelize is the ORM of ORMs, but who will argue for the other guys!',
    post_date: '5/4/2023',
    featured: false,
  },

];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
