var express = require(express);
var router = express.Router();
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var User = require('../models/');

router.post('/signup',(req,res,next)=>{
    bcrypt.hash(req.body.email,10, (err,hash)=>{
            if(err){
                return res.status(500).json({
                    error:err
                })
            }else {
            var user = new User({
                _id:new mongoose.Types.ObjectId,
                email: req.body.email,
                password: hash
        })
        user.save()
        .than(result => {
            res.status(201).json({
                message:'User created'
            })
        })
        .catch(err =>{
            console.log(err);
            res.status(404).json({
                
            })
        });
    }
})

})

module.exports = router;