const router = require('express').Router();

const userRoutes = require('./user-routes');
const dashRoutes = require('./dash-routes');
const loginRoutes = require('./login-routes');

router.use('/users', userRoutes);
router.use('/dashboard', dashRoutes);
router.use('/login', loginRoutes);

module.exports = router;