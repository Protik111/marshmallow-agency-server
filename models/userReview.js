const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema
const reviews = new Schema({
    id: Number,
    nameR: String,
    imgR: String,
    review: String,
});

const AllReviews = mongoose.model('allReviews', reviews);

//export 
module.exports = AllReviews;