const mongoose = require('mongoose');

const User = require('./models/user');

mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
  console.log('connected to test db!');
});

module.exports = db;
