const mongoose = require('mongoose');
const Line = require('./Lines');
const TableauSchema = new mongoose.Schema({

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['Horodaté','Statique'],

  },
  name: {
    type: String,
    required: [true, 'Vous devez ajouter un nom a votre tableau'],
  },
  description: {
    type: String,
  },
  columns: {
    type: [String],
    validate: [arrayLimit, '{PATH} exceeds the limit of 4 elements'],
    required: [true, 'Vous devez ajouter au moins une colonne']
  },
  lines: [{
    type: mongoose.Schema.Types.Mixed,
    ref: 'Lines'
  }],

}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

function arrayLimit(val) {
  return val.length <= 4;
}


TableauSchema.pre('remove', async function(next) {
    // Supprime toutes les lignes où 'tableauId' correspond à l'ID du tableau actuel
    await Line.deleteMany({ tableauId: this._id });
    next();
  });



module.exports = mongoose.model('Tableau', TableauSchema);
