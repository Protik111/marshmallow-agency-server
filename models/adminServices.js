const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema
const services = new Schema({
    id: Number,
    name: String,
    img: String,
    description: String,
});

//model
const AllServices = mongoose.model('allServices', services);

//export
module.exports = AllServices;