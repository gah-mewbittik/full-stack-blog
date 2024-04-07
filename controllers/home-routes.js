const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Get homepage
router.get('/', async(req, res) => {
try{
  
  let postData;

  if(req.session.loggedIn){
    postData = await Post.findAll({
      include:User
    });
  }else{
    //GET All posts TODO: fix this
    postData = await Post.findAll(
      {where:{
        featured: true,
      },
      include:User
    }
    );
  }
    const posts = postData.map((post) => post.get({plain: true}));
    console.log(posts)
    res.render('homepage', {
      loggedIn: req.session.loggedIn,
      userId: req.session.user_id,
      posts,
    });
}catch(err){
  console.log(err);
  res.status(500).json(err);
}

});

//Get Dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where:{
        user_id: req.session.user_id
      },
      include:User
    });
    const posts = postData.map((post) => post.get({plain: true}))
    console.log(posts);
    console.log(' user is: ', req.session.user_id);
    res.render('dashboard', {
      loggedIn: req.session.loggedIn,
      userId: req.session.user_id,
      posts
    });

  } catch (err) {
    res.status(500).json(err);
  }
});


//get login
router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get("/post/:id", async (req, res)=>{
  try{

    const postInfo = await Post.findByPk(req.params.id);
    const post = postInfo.get({plain:true})


    res.render("editPost",{
      loggedIn: req.session.loggedIn,
      post
    })

  }catch(err){
    console.log(err)
    res.status(500).json(err)
  }
})

//Get COMMENT TODO: Fix /:id
router.get('/comment/:id', async (req, res) => {
  // If a session exists, redirect the request to the comment page
  console.log(req.session.loggedIn)
  if (req.session.loggedIn) {
    try{

      const postInfo = await Post.findByPk(req.params.id,{
        include:[
          User,
          {
            model:Comment,
            include:User,
            
          }
        
        ]
        
      });
      const post = postInfo.get({plain:true})
      // console.log(post)
      post.comments.reverse()
      console.log(post.comments)
   
  
      res.render("comment",{
        loggedIn: req.session.loggedIn,
        post
      })
  
    }catch(err){
      console.log(err)
      res.status(500).json(err)
    }

  }else{
    res.redirect('/login');
  }

 
});



router.get('/signUp', (req, res) => {
  res.render('signUp');
});



module.exports = router;
