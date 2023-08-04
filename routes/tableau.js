const express = require('express');
const {
  createTableau,
  getTableaux,
  getTableau,
  updateTableau,
  deleteTableau,
} = require('../controllers/tableau');

const Tableau = require('../models/Tableau');
const advancedResults = require('../middlewares/advancedResults');



const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middlewares/auth');

// router.use(protect);


router.route('/')
  .get(advancedResults(Tableau), getTableaux)
  .post(createTableau);

router.route('/:id')
  .get(advancedResults(Tableau), getTableau)
  .put(updateTableau)
  .delete(deleteTableau);

module.exports = router;
