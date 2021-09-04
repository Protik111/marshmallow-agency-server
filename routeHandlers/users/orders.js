const express = require('express');
const router = express.Router();
const AllOrders = require('../../models/userOrder');

//creating a order
router.post('/addOrder', (req, res) => {
    //instance
    const newOrder = new AllOrders(req.body);
    newOrder.save((err) => {
        if(err) {
            res.status(500).json({
                message: 'Ordered failed',
                error: err
            });
        }else{
            res.status(200).json({
                message: 'Ordered added successfully',
            })
        }
    });
});

//export
module.exports = router;