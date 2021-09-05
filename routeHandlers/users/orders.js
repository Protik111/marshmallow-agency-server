const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const AllOrders = require('../../models/userOrder');


const serviceAccount = require("../../marshmallow-agency-firebase-adminsdk-9qp56-48a5ba5130.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://marshmallow-agency.firebaseio.com'
});


//creating a order
router.post('/addOrder', (req, res) => {
    //instance
    const newOrder = new AllOrders(req.body);
    newOrder.save((err) => {
        if (err) {
            res.status(500).json({
                message: 'Ordered failed',
                error: err
            });
        } else {
            res.status(200).json({
                message: 'Ordered added successfully',
            })
        }
    });
});

//showing all orders for specific order
router.get('/showAllOrders', (req, res) => {
    // console.log(req.headers.authorization);

    AllOrders.find({email: req.query.email}, (err, documents) => {
        res.send(documents);
    })
    //firebase jwt verification sometimes works 
    // const bearer = req.headers.authorization;
    // if (bearer && bearer.startsWith('Bearer ')) {
    //     const idToken = bearer.split(' ')[1];
    //     console.log({ idToken });
    //     admin
    //         .auth()
    //         .verifyIdToken(idToken)
    //         .then((decodedToken) => {
    //             const tokenEmail = decodedToken.email;
    //             const idEmail = req.query.email;
    //             if (tokenEmail == idEmail) {
    //                 AllOrders.find({ email: req.query.email }, (err, documents) => {
    //                     res.send(documents);
    //                 })
    //             }
    //         })
    //         .catch((error) => {
    //         });
    // }


});

//export
module.exports = router;