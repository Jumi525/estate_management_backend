const mongoose = require('mongoose');

const savePropertySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, require: true },
    propertyId: { type: mongoose.Schema.Types.ObjectId, require: true },
  },
  { timestamps: true }
);

const saveProperty = new mongoose.model('savedQuery', savePropertySchema);

module.exports = saveProperty;
