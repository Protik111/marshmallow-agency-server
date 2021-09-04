const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.send('This is contact');
})

module.exports = router;