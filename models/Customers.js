const mongoose = require('mongoose');

const CustomersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
}, 
{
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

module.exports = mongoose.model('Customers', CustomersSchema);
