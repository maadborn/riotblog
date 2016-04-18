const mongoose = require('mongoose');
const Config = require('../config');

// Add all models
require('./models');

mongoose.connect(Config.MongoConnectionString);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
  console.log('connected to test db!');
});

module.exports = db;
