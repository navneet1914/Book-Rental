const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    book_id: String,
    book_name: String,
    is_premium: Boolean,
    concurrency: Number
  });

const licenseSchema = new mongoose.Schema({
    licenseName : String,
    orderNumber : String,
    books: [bookSchema]
  });

const LicenseSchema = mongoose.model('licenseSchemas', licenseSchema);
module.exports = LicenseSchema;