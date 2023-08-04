const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Customers = require('../models/Customers');

// @desc      Create customer
// @route     POST /api/v1/customers
// @access    Private/Admin
exports.createCustomer = asyncHandler(async (req, res, next) => {
  const customer = await Customers.create(req.body);

  res.status(201).json({
    success: true,
    data: customer,
  });
});

// @desc      Get customers
// @route     GET /api/v1/customers
// @access    Private
exports.getCustomers = asyncHandler(async (req, res, next) => {
  const customers = await Customers.find();

  res.status(200).json({
    success: true,
    data: customers,
  });
});

// @desc      Get customer
// @route     GET /api/v1/customer/:id
// @access    Private
exports.getCustomer = asyncHandler(async (req, res, next) => {
    const customer = await Customers.findById(req.params.id);
  
    if (!customer) {
      return next(
        new ErrorResponse(`Customer not found with id of ${req.params.id}`, 404)
      );
    }
  
    res.status(200).json({
      success: true,
      data: customer,
    });
  });
  

// @desc      Update customer
// @route     PUT /api/v1/customers/:id
// @access    Private/Admin
exports.updateCustomer = asyncHandler(async (req, res, next) => {
  let customer = await Customers.findById(req.params.id);

  if (!customer) {
    return next(
      new ErrorResponse(`Customer not found with id of ${req.params.id}`, 404)
    );
  }

  customer = await Customers.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: customer,
  });
});

// @desc      Delete customer
// @route     DELETE /api/v1/customers/:id
// @access    Private/Admin
exports.deleteCustomer = asyncHandler(async (req, res, next) => {
  const customer = await Customers.findById(req.params.id);

  if (!customer) {
    return next(
      new ErrorResponse(`Customer not found with id of ${req.params.id}`, 404)
    );
  }

  await customer.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
