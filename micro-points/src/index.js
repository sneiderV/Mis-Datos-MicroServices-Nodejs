const express = require('express');
const morgan = require('morgan');
const pointsRouter = require('./routes/points-routes');
const checkTokenMiddleWare = require('./lib/checkTokenMiddlewares');

//initializations
const app = express();

//Settings
app.set('port', process.env.PORT || 3004);

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
app.use('/api/points',checkTokenMiddleWare.checkToken,pointsRouter);

//Starting server
app.listen(app.get('port'), ()=>{
    console.log('Server Points on port: '+ app.get('port'));
    
});