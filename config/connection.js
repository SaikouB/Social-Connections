const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/socialConnection');

module.exports = mongoose.connection;