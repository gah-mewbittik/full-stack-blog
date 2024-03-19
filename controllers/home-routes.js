const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Get homepage
router.get('/', (req, res) => {
  res.render('homepage', {
    loggedIn: req.session.loggedIn,
    userId: req.session.user_id});
});

//Get Dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    console.log(' user is: ', req.session.user_id);
    res.render('dashboard', {
      loggedIn: req.session.loggedIn,
      userId: req.session.user_id
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
