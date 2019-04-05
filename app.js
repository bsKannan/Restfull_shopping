var express = require('express');
var app = express();
var morgan =require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');



var productRoutes = require('./api/routes/products');

var orderRoutes = require('./api/routes/orders')

mongoose.connect("mongodb://localhost:27017/restShp",{useNewUrlParser: true})


mongoose.Promise = global.Promise;
app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'))

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Header",
        "Origin,X-Reqested-with, Content-Type,Accept, Authorization");
    if(req.method === 'Options'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE')
        return res.status(200).json({})
    }
    next();
})

app.use('/products',productRoutes);
app.use('/orders',orderRoutes);

app.use((req,res,next) =>{
    var error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error,req,res,next) =>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
})


// app.use((req,res,next) =>{
//     res.status(200).json({
//         message:"It works!"
//     });
// });


module.exports = app;