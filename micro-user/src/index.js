const express = require('express');
const morgan = require('morgan');
const router = require('./routes/index.js');
const userRouter = require('./routes/user-routes');
//initializations
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use((error, req, res, next)=>{
    res.status(400).json({
        status: 'error',
        message: error.message
    });
});

//Global variables
app.use((req,res,next)=>{
    next();
});

//Routes
app.use(router);
app.use('/api/user',userRouter);


//Starting server
app.listen(app.get('port'), ()=>{
    console.log('Server on port: '+ app.get('port'));
    
});