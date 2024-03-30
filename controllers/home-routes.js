const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Get homepage
router.get('/', async(req, res) => {
try{
  
  let postData;

  if(req.session.loggedIn){
    postData = await Post.findAll({});
  }else{
    //GET All posts TODO: fix this
    postData = await Post.findAll(
      {where:{
        featured: true,
      }}
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
      
    }, {include: User});
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
  if (req.session.logged_in) {
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
      loggedIn: req.session.logged_in,
      post
    })

  }catch(err){
    console.log(err)
    res.status(500).json(err)
  }
})
// // Prevent non logged in users from viewing the Dashboard
// router.get('/dashboard', withAuth, async (req, res) => {
//   try {
//     const userData = await User.findAll({
//       attributes: { exclude: ['password'] },
//       order: [['name', 'ASC']],
//     });

//     const users = userData.map((project) => project.get({ plain: true }));

//     res.render('homepage', {
//       users,
//       // Pass the logged in flag to the template
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


// Get Login
// router.get('/login', (req, res) => {
//   // If a session exists, redirect the request to the homepage
//   if (req.session.logged_in) {
//     res.redirect('/');
//     return;
//   }

//   res.render('login');
// });

// get singUp



router.get('/signUp', (req, res) => {
  res.render('signUp');
});



module.exports = router;
