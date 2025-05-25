const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, 'Title is required'],
      trim: true,
      maxLength: [50, 'Title can not be more than 50 characters'],
    },
    description: {
      type: String,
      require: [true, 'Description is required'],
      trim: true,
      maxLength: [100, 'Description can not be more than 100 characters'],
    },
    price: {
      type: Number,
      require: [true, 'Price is required'],
      min: [0, 'Price cannot be zero'],
    },
    location: { type: String, require: [true, 'Location is required'] },
    agent: {
      type: String,
      enum: ['user', 'agent'],
      default: 'user',
      require: true,
    },
    createdAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

const Property = new mongoose.model('Property', PropertySchema);

module.exports = Property;
