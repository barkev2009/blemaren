const Router = require('express');
const router = new Router();
const cycleController = require('../controllers/cycleController');

router.post('/', cycleController.create);
router.get('/', cycleController.getById);

module.exports = router;