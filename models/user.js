const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = Schema({
    googleId: Number
});



module.exports = mongoose.model("user", userSchema);
