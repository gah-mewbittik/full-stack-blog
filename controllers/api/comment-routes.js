const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE comment
router.post('/createComment', withAuth, async (req, res) => {
    try {
        const { user_id, post_id, comment_test } = req.body;

      const dbCommentData = await Comment.create({
        user_id,
        post_id,
        comment_text: req.body.description,
      
      });
  
      // req.session.save(() => {
      //   req.session.loggedIn = true;
  
        res.status(200).json(dbCommentData);
      //});
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

module.exports = router;