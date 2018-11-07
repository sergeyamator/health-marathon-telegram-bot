const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: String,
    second_name: String,
    username: String,
    chat_id: String,
    option: Number,
});

module.exports = mongoose.model('User', userSchema);