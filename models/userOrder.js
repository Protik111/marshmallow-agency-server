const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema
const orders = new Schema({
    name: String,
    email: String,
    phone: String,
    orderName: String,
    description: String,
});

//model
const AllOrders = mongoose.model('allOrders', orders);

module.exports = AllOrders;