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

//GET single Post
router.get('/posts/:id', async (req, res) => {
  try{
    const postId = req.params.id;
    const post = await Post.findByPk(postId);

    if(!post){
      return res.status(404).json({ message: 'Post not found'});
    }

    res.status(200).json(post);
  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});

//Update a Post
router.put('/posts/:id', async (req, res) => {
  try{
    const updatePost = await Post.update(
      {
        title: req.body.title,
        description: req.body.description,
      },
      {
        where: {
          id: req.params.id,
        },
      });
      
      return res.status(200).json(updatePost);
  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});

//Delete a Post
router.delete('/posts/:id', async (req, res) => {
  try{
    const deletePost = await Post.destroy({
      where: {
        id: req.params.id,
      }
    });
    if(deletePost){
      return res.status(200).json({message: 'Post Deleted successfully'});
    }else{
      return res.status(404).json();
    }

  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});


  module.exports = router;