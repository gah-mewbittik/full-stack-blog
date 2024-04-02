const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE comment
router.post('/createComment', withAuth, async (req, res) => {
    try {
        const { postId, comment_text } = req.body;

        console.log("we are in the create comment route ------ > ", req.body.comment_text )

      const dbCommentData = await Comment.create({
        user_id: req.session.user_id,
        post_id: postId,
        comment_text: req.body.comment_text,
        
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