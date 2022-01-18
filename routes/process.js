const express = require('express');
const router = express.Router();
const proCtrl = require('../controllers/process');

router.post('/outcomes/:o_id/performances/:p_id/processes', proCtrl.create);
router.get('/performances/:id/edit', proCtrl.edit);
router.put('/processes/:id', proCtrl.update);
router.delete('/processes/:id', proCtrl.delete);

module.exports = router;