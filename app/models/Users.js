const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    discordID: String,
    region: String
});

const Users = mongoose.model('Users', userSchema);
module.exports = Users;