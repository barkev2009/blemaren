const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const courseRouter = require('./courseRouter');
const measureRouter = require('./measureRouter');

router.use('/user', userRouter);
router.use('/course', courseRouter);
router.use('/measure', measureRouter);

module.exports = router;