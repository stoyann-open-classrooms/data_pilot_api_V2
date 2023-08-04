const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Tableau = require('../models/Tableau');
const Line = require('../models/Lines');

// @desc      Create tableau
// @route     POST /api/v1/tableau/create
// @access    Private/Admin
exports.createTableau = asyncHandler(async (req, res, next) => {
 
  const tableau = await Tableau.create(req.body);

  res.status(201).json({
    success: true,
    data: tableau,
  });
});

// @desc      Get tableaux
// @route     GET /api/v1/tableau
// @access    Private
exports.getTableaux = asyncHandler(async (req, res, next) => {
  const tableaux = await Tableau.find();

  res.status(200).json({
    success: true,
    data: tableaux,
  });
});


// @desc      Get tableau
// @route     GET /api/v1/tableau/:id
// @access    Private
exports.getTableau = asyncHandler(async (req, res, next) => {
  const tableau = await Tableau.findById(req.params.id);

  if (!tableau) {
    return next(
      new ErrorResponse(`Tableau not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: tableau,
  });
});



// @desc      Update tableau
// @route     PUT /api/v1/tableau/:id
// @access    Private/Admin
exports.updateTableau = asyncHandler(async (req, res, next) => {
    let tableau = await Tableau.findById(req.params.id);
  
    if (!tableau) {
      return next(
        new ErrorResponse(`Tableau not found with id of ${req.params.id}`, 404)
      );
    }
  
   
  
    tableau = await Tableau.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  
    res.status(200).json({
      success: true,
      data: tableau,
    });
  });
  
// @desc      Delete tableau
// @route     DELETE /api/v1/tableau/:id
// @access    Private/Admin
exports.deleteTableau = asyncHandler(async (req, res, next) => {
    const tableau = await Tableau.findById(req.params.id);
  
    if (!tableau) {
      return next(
        new ErrorResponse(`Tableau not found with id of ${req.params.id}`, 404)
      );
    }



    // Then remove the tableau
    await tableau.deleteOne();
  
    res.status(200).json({
      success: true,
      data: {},
    });
});
