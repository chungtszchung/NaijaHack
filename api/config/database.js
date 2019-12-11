const mongoose = require('mongoose');

const db = async () => {
  try {
    console.log(`Connecting to database...`);
    await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Connected to database');
  } catch (err) {
    console.error(err);
  }
}
module.exports = db;