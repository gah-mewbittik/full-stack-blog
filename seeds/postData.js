const { Post } = require('../models');

const postData = [
  {
    title: 'Sequelize to Realize',
    description: 'Wow, sequelize is so useful!',
    post_date: '8/8/2023',
    blog_id: 1,           //TODO: remember to change these if a Blog model is created
  },
  {
    title: 'Front-end mastery',
    description: 'To master font-end visit w3schools site and read documentation. Do not forget to practice, practice, and practice',
    post_date: '6/6/2023',
    blog_id: 1,
  },
  {
    title: 'Full-Stack mastery',
    description: 'Practice, practice, practice, practice, practice, and did I mention practice',
    post_date: '5/5/2023',
    blog_id: 1,
  },
  {
    title: 'New Era of Development',
    description: 'With the new developments in AI, we enter a world of creativity or doom?',
    post_date: '5/4/2023',
    blog_id: 1,
  },
  {
    title: 'To Sequelize or Not to Sequelize is the question?',
    description: 'Sequelize is the ORM of ORMs, but who will argue for the other guys!',
    post_date: '5/4/2023',
    blog_id: 1,
  },

];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
