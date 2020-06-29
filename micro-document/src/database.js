const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./config-app');

//multi threads
const pool = mysql.createPool(database);

//connection 
pool.getConnection((error, connection)=>{
    if (error) {
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        else if (error.code === 'ER_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        else if (error.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED');
        } else{
            console.error(error);
        }
    }

    if (connection) {
        connection.release();
        console.log('DB is connected');
        return;
    }
});

//callbacks to promise (Promisify Pool Querys)
pool.query = promisify(pool.query);

module.exports = pool;