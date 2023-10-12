// Creates and coonects to mongoose database
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/socialConnection');
// Exports mongoose database
module.exports = mongoose.connection;