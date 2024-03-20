const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
//const withAuth = require('../../utils/auth');

//TODO: fix the below get
// Prevent non logged in users from viewing the Dashboard

// CREATE Post
router.post('/createPost', async (req, res) => {
  try {
    const dbUserData = await Post.create({
      name: req.body.name,
      description: req.body.description,
    
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

  module.exports = router;