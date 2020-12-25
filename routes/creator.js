const express = require('express');

const creatorController = require('../controllers/creator');

const router = express.Router();

router.get('/',creatorController.getCreatorPage);
router.get('/create-new',creatorController.getCreateNew);
router.post('/create-new',creatorController.postCreateNew);
router.post('/delete',creatorController.postDelete);

module.exports = router;