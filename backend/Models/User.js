const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  role: {
    type: String,
    enum: ['Admin', 'User', 'Manager', 'Guest'],
    default: 'User',
    index: true
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Pending'],
    default: 'Active',
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  age: {
    type: Number,
    min: 18,
    max: 100
  },
  department: {
    type: String,
    index: true
  }
}, {
  timestamps: true
});

// Compound index for common queries
userSchema.index({ role: 1, status: 1, createdAt: -1 });
userSchema.index({ name: 'text', email: 'text' });

module.exports = mongoose.model('User', userSchema);