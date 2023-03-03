const Router = require('express');
const router = new Router();
const measureController = require('../controllers/measureController');

router.post('/', measureController.create);
router.get('/', measureController.get);

module.exports = router;