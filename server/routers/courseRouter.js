const Router = require('express');
const router = new Router();
const courseController = require('../controllers/courseController');

router.post('/', courseController.create);
router.get('/:id', courseController.getById);
router.get('/', courseController.getByLogin);
router.delete('/:id', courseController.delete);

module.exports = router;