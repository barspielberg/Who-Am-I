const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/:quesId',userController.getQuestionnaire);
router.post('/:quesId',userController.postQuestionnaire);

module.exports = router;