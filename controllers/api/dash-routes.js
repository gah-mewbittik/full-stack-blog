const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
//const withAuth = require('../../utils/auth');


// Prevent non logged in users from viewing the Dashboard

// CREATE Post
router.post('/createPost', async (req, res) => {
  try {
    const dbUserData = await Post.create({
      title: req.body.title,
      description: req.body.description,
      post_date: req.body.post_date,
      featured: false,
      user_id: req.session.user_id,
    
    });

    // req.session.save(() => {
    //   req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    //});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

  module.exports = router;