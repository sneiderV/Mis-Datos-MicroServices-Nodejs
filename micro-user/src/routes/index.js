const express = require('express');
const router = express.Router();

//init
router.get('/', (req, res) =>{
    res.send('User Microservice ready!');
});

module.exports = router;