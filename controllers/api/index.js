const router = require('express').Router();

const userRoutes = require('./user-routes');
const dashRoutes = require('./dash-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/dashboard', dashRoutes);
router.use('/login', userRoutes);
router.use('/comment', commentRoutes);

module.exports = router;