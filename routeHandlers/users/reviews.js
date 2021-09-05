const express = require('express');
const router = express.Router();
const AllReviews = require('../../models/userReview');


//inserting bulk reviews
router.post('/addBulkReview', (req, res) => {
    AllReviews.insertMany(req.body, (err) => {
        if(err){
            res.status(500).json({
                message: 'Error inserting review',
                error: err
            });
        }else{
            res.status(200).json({
                message: 'Review added successfully',
            });
        }
    });
})
//post a review
router.post('/addReview', (req, res) => {
    //instance
    const newReview = new AllReviews(req.body);
    newReview.save(err => {
        if(err) {
            res.status(500).json({
                message: 'There was a server side error',
                error: err
            });
        }else{
            res.status(200).json({
                message: 'Review added successfully',
            });
        }
    });
});

//showing all reviews in homepage
router.get('/showAllReviews', (req, res) => {
    AllReviews.find({}, (err, reviews) => {
        res.send(reviews);
    })
})

//showing specific reviews for user
router.get('/showReview', (req, res) => {
    AllReviews.find({emailR: req.query.email}, (err, documents) => {
        res.send(documents);
    })
})


//exports
module.exports = router;