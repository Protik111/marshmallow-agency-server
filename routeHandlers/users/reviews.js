const express = require('express');
const router = express.Router();
const AllReviews = require('../../models/userReview');
const multer  = require('multer');
const path = require('path');

router.use(
    "/avatar",
    express.static(__dirname+"files/")
    );

const Storage = multer.diskStorage({
    destination: "files/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
  });

const upload = multer({
    storage: Storage
}).single('imgR');

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
router.post('/addReview', upload, (req, res) => {
    //instance
    console.log(req.file, req.body);
    const newReview = new AllReviews({
        nameR: req.body.nameR,
        emailR: req.body.emailR,
        review: req.body.review,
        imgR: req.file.filename
    });
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