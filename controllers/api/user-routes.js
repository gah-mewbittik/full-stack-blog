const router = require('express').Router();
const { User } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
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

//Get All users
router.get('/', async (req, res) => {
  try{
    const userData = await User.findAll({});

    const users = userData.map((user) => user.get({plain: true}));
      res.json(users);
    

  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});

//Get a single User TODO: why Is this crashing when uncommented out
router.get('/:id', async (req, res) => {
  try{
    const user = await User.findOne({
      where: {id: req.params.id },
    });

    if(!user){
      return res.status(404).json({message: 'User not found'});
    }

    res.json(user);

  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});

////////////////////////////////
// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//Sign up
router.post('/signup', async (req, res) => {
  try{
    // Check if the email already exists in the database
    const existingUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (existingUser) {
      // If the email already exists, return a 400 status with an error message
      return res.status(400).json({ message: 'Email address is already in use' });
    }

    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json({message: 'Successfully Signed Up'});
  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
