const express = require('express');
const router = express.Router();

const {
  createMood,
  getMoods,
  deleteMood
} = require('../controller/moods');


router.post('/', createMood);


router.get('/', getMoods);


router.delete('/:id', deleteMood);

module.exports = router;
