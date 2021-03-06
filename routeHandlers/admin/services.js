const express = require('express');
const router = express.Router();
const AllServices = require('../../models/adminServices');

//adding bulk data to database
router.post('/addBulkService', (req, res) => {
    AllServices.insertMany(req.body, (err) => {
        if(err){
            res.status(500).json({
                message: 'Error inserting service',
                error: err
            });
        }else{
            res.status(200).json({
                message: 'Service added successfully',
            });
        }
    })
});

//showing all services in homepage
router.get('/showAllServices', (req, res) => {
    AllServices.find({}, (err, service) => {
        res.send(service);
    })
});

//creating a service from admin
router.post('/makeService', (req, res) => {
    const newService = new AllServices(req.body);
    newService.save(err => {
        if(err){
            res.status(500).json({
                message: 'Error creating service',
                error: err
            });
        }else{
            res.status(200).json({
                message: 'Service created successfully',
            })
        }
    });
})

//export
module.exports = router;