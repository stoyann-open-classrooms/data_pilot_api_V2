const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Tableau = require('../models/Tableau');
const Line = require('../models/Lines');

// @desc    Get all lines
// @route   GET /api/v1/lines
// @access  Public
exports.getLines = asyncHandler(async (req, res, next) => {
  const lines = await Line.find();
  res.status(200).json({ success: true, data: lines });
});

// @desc    Get single line
// @route   GET /api/v1/lines/:id
// @access  Public
exports.getLine = asyncHandler(async (req, res, next) => {
  const line = await Line.findById(req.params.id);

  if (!line) {
    return next(
      new ErrorResponse(`No line found with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: line });
});


// @desc      Create tableau
// @route     POST /api/v1/tableau/create
// @access    Private/Admin
exports.createLine = asyncHandler(async (req, res, next) => {
 
  const line = await Line.create(req.body);

  res.status(201).json({
    success: true,
    data: line,
  });
});

// @desc    Update line
// @route   PUT /api/v1/lines/:id
// @access  Private
exports.updateLine = asyncHandler(async (req, res, next) => {
  const line = await Line.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!line) {
    return next(
      new ErrorResponse(`No line with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: line });
});

// @desc    Delete line
// @route   DELETE /api/v1/lines/:id
// @access  Private
exports.deleteLine = asyncHandler(async (req, res, next) => {
  const line = await Line.findByIdAndDelete(req.params.id);

  if (!line) {
    return next(
      new ErrorResponse(`No line with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: {} });
});
