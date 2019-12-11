const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  matric_no:{
    type: String,
    required: true
  },
  locationUrl:{
    type: String,
    required: true
  },
  isAlertActive:{
    type: Boolean,
    required: true,
    default: false
  },
  saved: {
    type: Boolean,
    default: false,
    required: true
  }
})

module.exports = mongoose.model('Updates', schema);