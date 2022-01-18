const express = require('express');
const router = express.Router();
const outcomesCtrl = require('../controllers/outcome');

router.get('/', outcomesCtrl.index);
router.post('/', outcomesCtrl.create);
router.get('/:id', outcomesCtrl.show);
router.put('/:id', outcomesCtrl.update);
router.delete('/:id', outcomesCtrl.delete);

module.exports = router;