const Router = require('express');
const router = new Router();
const courseController = require('../controllers/courseController');

router.post('/', courseController.create);
router.get('/:id', courseController.getById);
router.get('/:login', courseController.getByLogin);

module.exports = router;