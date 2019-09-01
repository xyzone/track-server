const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = (req, res, next) => {
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).send({error: 'You need login'})
    }
    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, 'Richard_liu', 
        async (err, payload) => {
            if (err){
                return res.status(401).send({error: 'you need login first'})
            }
            const {userId} = payload
            const user = await User.findById(userId)
            req.user = user
            next();
        })

}