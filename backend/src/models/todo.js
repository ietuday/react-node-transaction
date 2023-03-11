const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true 
  },
  status:{
    type: String,
    required: true
  },   
  user:  {
    type: String,
    required: true 
  },
  date:{
    type: Date,
    required : true
  },
  isDeleted:{
    type: Boolean,
    default:false
    }
});

module.exports = mongoose.model('Todo', todoSchema);