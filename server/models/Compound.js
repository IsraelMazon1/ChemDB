// server/models/Compound.js

const mongoose = require('mongoose');

const CompoundSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  formula: { type: String, required: true },
  molecularWeight: { type: Number, required: true },
  details: { type: String, required: true },
  applications: [{ type: String }]
});

module.exports = mongoose.model('Compound', CompoundSchema);
