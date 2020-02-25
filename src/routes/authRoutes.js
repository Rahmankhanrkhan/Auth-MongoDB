const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('Profile');
const jwt = require('jsonwebtoken')

const router = express.Router();

router.post('/signup', async (req, res) => {

    const { email, password } = req.body;
    console.log('email:::', email)

    try {
        const user = new User({ email, password });
        await user.save();

        const token = jwt.sign({ userId: user._id }, 'MY_SECRETE_KEY');
        console.log('token:::', token)

        res.send({ token });
        //res.send('Router Requsted!')
        console.log('POSTMAN, req.body:: ', req.body)

    } catch (err) {
        return res.status(404).send(err.message)
    } 
});

module.exports = router;