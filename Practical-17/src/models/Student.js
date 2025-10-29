const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a student name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number'],
    maxlength: [15, 'Phone number cannot be longer than 15 characters']
  },
  standard: {
    type: String,
    required: [true, 'Please add a standard/class'],
    trim: true
  },
  subject: {
    type: String,
    required: [true, 'Please add a subject'],
    trim: true
  },
  feesPaid: {
    type: Number,
    default: 0,
    min: [0, 'Fees paid cannot be negative'],
    validate: {
      validator: function(value) {
        return value <= this.feesTotal;
      },
      message: 'Fees paid cannot be more than total fees'
    }
  },
  feesTotal: {
    type: Number,
    required: [true, 'Please add total fees'],
    min: [0, 'Total fees cannot be negative']
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  admissionDate: {
    type: Date,
    default: Date.now
  },
  remarks: {
    type: String,
    maxlength: [200, 'Remarks cannot be more than 200 characters']
  }
}, {
  timestamps: true
});

// Virtual for fees balance
studentSchema.virtual('feesBalance').get(function() {
  return this.feesTotal - this.feesPaid;
});

// Include virtuals in JSON output
studentSchema.set('toJSON', { virtuals: true });
studentSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Student', studentSchema);