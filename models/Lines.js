const mongoose = require('mongoose');

const LineSchema = new mongoose.Schema({
  tableau: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tableau',
    required: true,
  },
  
  dateStart: {
    type: Date,
    default: Date.now,
  },

  dateEnd: {
    type: Date,
  
  },

  data_1: {
    type: [String],
    required: [true, 'Please add data'],
  },
  data_2: {
    type: [String],
  },
  data_3: {
    type: [String],
  },
  data_4: {
    type: [String],
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
}); 



module.exports = mongoose.model('Line', LineSchema);
