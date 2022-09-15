const express = require('express');
const router = express.Router();
const perfCtrl = require('../controllers/performance');

router.post('/outcomes/:id/performances', perfCtrl.create);
router.get('/outcomes/:oid/performances/:id', perfCtrl.findOne)
router.get('/performances/:id/edit', perfCtrl.edit);
router.put('/performances/:id', perfCtrl.update);
router.delete('/performances/:id', perfCtrl.delete);

module.exports = router;