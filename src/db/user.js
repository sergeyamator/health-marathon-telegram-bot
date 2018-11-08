const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: String,
  second_name: String,
  username: String,
  chat_id: String,
  option: Number,
  agreement: Boolean,
  current_day: Number,
  telegramId: Number,
  created_at: {type: Date, required: true, default: Date.now},
  period: Number,
});

module.exports = mongoose.model('User', userSchema);
