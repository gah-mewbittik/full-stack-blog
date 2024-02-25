const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashRoutes = require('./dash-routes');
const loginRoutes = require('./login-routes');


router.use('/', homeRoutes);
router.use('/dashboard', dashRoutes);
router.use('/login', loginRoutes);

router.use('/api', apiRoutes);

module.exports = router;