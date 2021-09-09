const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema
const reviews = new Schema({
    id: String,
    nameR: String,
    emailR: String,
    imgR: {
        type: String
    },
    review: String,
});

const AllReviews = mongoose.model('allReviews', reviews);

//export 
module.exports = AllReviews;