var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});

app.get('/users', function (req, res) {

    // connection configurations
    var dbConn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'dbpassword',
        database: 'test'
    });

    dbConn.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});

// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});

