const express = require('express');
const morgan = require('morgan');
const documentRouter = require('./routes/document-routes');
const json2xls = require('json2xls');
const checkTokenMiddleWare = require('./lib/checkTokenMiddlewares');

//initializations
const app = express();

//Settings
app.set('port', process.env.PORT || 3005);

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(json2xls.middleware);


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
app.use('/api/document',checkTokenMiddleWare.checkToken,documentRouter);

//Starting server
app.listen(app.get('port'), ()=>{
    console.log('Server Document on port: '+ app.get('port'));
    
});