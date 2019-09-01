const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = mongoose.model('User')

const router = express.Router()

router.post('/signup', async (req, res) => {
    console.log(req.body)
    const {email, password} = req.body;
    try{
        const user = new User({email, password}); 
        await user.save();
        const token = jwt.sign({userId: user._id}, 'Richard_liu')

        res.send({token})
    } catch(err){
        return res.status(422).send(err.message)
    }
    
})

router.post('/signin', async (req, res)=> {
    const {email, password} = req.body;
    console.log(req.body)
    if (!email | !password){
        return res.status(422).send({error: 'Please input usename and password'})
    }
    const user = await User.findOne({email})
    if (!user){
        return res.status(422).send({error: 'email not found'})
    }
    try{
        await user.comparePassword(password)
        const token = jwt.sign({userId: user._id}, 'Richard_liu')
        res.send({token})
    } catch(err){
        return res.status(422).send({error: 'password is invalid'})
    }
})
module.exports = router;