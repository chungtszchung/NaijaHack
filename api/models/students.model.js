const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  matric_no:{
    unique: true,
    required: true,
    type: String
  },
  firstname:{
    required: true,
    type: String
  },
  middlename:{
    type: String
  },
  lastname:{
    required: true,
    type: String
  },
  level:{
    required: true,
    type: Number
  },
  hallOfResidence:{
    required: true,
    type: String
  },
})

module.exports = mongoose.model('Students', schema);