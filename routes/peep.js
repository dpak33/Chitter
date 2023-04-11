const express = require('express');
const router = express.Router();
const Peep = require('../models/peepModel');
const authMiddleWare = require('../middlewares/authMiddleWare');


router.post('/', async (req, res, next) => {
    const peep = new Peep({
        description: req.body.description,
        username: req.body.username, // Use the username sent in the request
    });
    try {
        const newPeep = await peep.save();
        res.status(201).json(newPeep);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});


router.get('/', async (req, res, next) => {
    try {
        const allPeeps = await Peep.find();
        res.status(200).json(allPeeps);
    } catch (err) {
        handleError(500, err);
    }
});

module.exports = router;