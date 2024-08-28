const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please enter First Name'],
    trim: true,
    lowercase: true,
    minlength: [3, 'First Name must be at least 3 characters long'],
    maxlength: [15, 'First Name must be at most 15 characters long']
  },
  lastName: {
    type: String,
    required: [true, 'Please enter Last Name'],
    trim: true,
    lowercase: true,
    minlength: [1, 'Last Name must be at least 1 character long'],
    maxlength: [15, 'Last Name must be at most 15 characters long']
  },
  email: {
    type: String,
    required: [true, 'Please enter Email Address'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\. [0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please add a valid email address.'],
  },
  contactNo: {
    type: String,
    required: [true, 'Please enter Contact Number'],
    trim: true,
    match: [/^((\+91-?)|0)?[0-9]{10}$/, 'Please enter a valid 10-digit Contact Number'],
    minlength: [10, 'Contact Number must be exactly 10 digits'],
    maxlength: [10, 'Contact Number must be exactly 10 digits']
  },
  role:{
    type: String,
    required: [true, 'Please enter Password'],
  },
  password: {
    type: String,
    required: [true, 'Please enter Password'],
  }
},{
    timestamps:true
});

module.exports = mongoose.model('User', userSchema);
