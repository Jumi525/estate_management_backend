const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: { type: String, enum: ['agent', 'user'], default: 'user' },
    createdAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

const Authentication = new mongoose.model('Authentication', AuthSchema);

module.exports = Authentication;
