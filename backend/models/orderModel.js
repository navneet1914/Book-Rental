const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  book_id: String,
  book_name: String,
  is_premium: Boolean
});

const orderSchema = new mongoose.Schema({
  bundle_id: Number,
  bundle_name: String,
  books: [bookSchema]
});

// specifying the collection name 'test'
const Order = mongoose.model('Order', orderSchema, 'test'); 

module.exports = Order;
