const express = require('express');
const morgan = require('morgan');
const businessTransactionRouter = require('./routes/business-transaction-routes');
const checkTokenMiddleWare = require('./lib/checkTokenMiddlewares');

//initializations
const app = express();

//Settings
app.set('port', process.env.PORT || 3007);

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


//Global variables
app.use((req,res,next)=>{
    next();
});

app.use((error, req, res, next)=>{
    res.status(400).json({
        'status': 'error',
        'message': error.message,
    });
    next();
});

//Routes
app.use('/api/business-transaction',checkTokenMiddleWare.checkToken,businessTransactionRouter);

//Starting server
app.listen(app.get('port'), ()=>{
    console.log('Server Transaction on port: '+ app.get('port'));
    
});