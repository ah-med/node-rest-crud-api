# About This Repo


Simple source code demonstrating how to setup your node connection with a MYSQL database

### Setup Your MYSQL Database (MAC) 
I've only used mysql on mac, if you use something else you gonna have to google out your solution and return to the next section to learn how the connection is made 😎.

1. Well, I like brew alot cos it makes it super easy to setup your app
```
$ brew install // ofcourse that's if you don't have brew installed 😏
```

2. Once we've confirmed installation then, we can graciously proceed to install mysql

```
$ brew install mysql // and boom ! you have mysql installed
```

3. Mysql workbench is a really useful UI tool to run you mysql query and view your database data.

```
$ brew cask install mysqlworkbench 
```

### Lets get Started: Create your Database
Fire up your mysqlwrokbench app that you just downloaded. Just click on the locahost, 3306.

First off, lets create a database

```
CREATE DATABASE test;
```

Then you can run the query to create a table:
```
-- Table structure for users
  CREATE TABLE IF NOT EXISTS users (
    id int(11) NOT NULL,
    name varchar(200) NOT NULL,
    email varchar(200) NOT NULL,
    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
  ALTER TABLE users ADD PRIMARY KEY (id);
  ALTER TABLE users MODIFY id int(11) NOT NULL AUTO_INCREMENT;
```

insert data we will be working with

```
INSERT INTO users (id, name, email, created_at) VALUES
  (1, 'Test', 'test@g.co', '2019-02-28 13:20:20'),
  (2, 'john', 'john@g.co', '2019-02-28 13:20:20'),
  (3, 'tutsmake', 'tuts@g.co', '2019-02-28 13:20:20'),
  (4, 'tut', 'tut@g.co', '2019-02-28 13:20:20'),
  (5, 'mhd', 'mhd@g.co', '2019-02-28 13:20:20');
```

### Node connection with MYSQL Database
create a folder and checkout into the folder
```
$ mkdir mysql-node && cd mysql-node
```

initialize npm, to crate a package.json file

```
$ npm init -y
```

install bodyparser, express and mysql

```
$ npm install -S bodyparser
$ npm install -S express
$ npm install -S mysql
```

create your server file

```
$ touch server.js
```

require your dependencies and create and express app in the server.js file

```
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();
```


use bodyparser middleware to parese the data into req.body, add to server.js file

```
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
```


add your default route
```
// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});
```
add *get /users* route to fetch the list of all users in our database, in this route's callback we would establish a connection with the database and we will use the newly created connection to query the database

```
app.get('/users', function (req, res) {

    // connection configurations
    var dbConn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'your password',
        database: 'your database name'
    });

    dbConn.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});
```

now lets provide a port for our server
```
// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
```

before we test this out lets add the start script for the server in package.json
```
  "scripts": {
    "start": "node server.js"
  }
```

then you can start your server and visit 
```
$ npm start
```

visit via browser or postman
[http://localhost:3000/users](http://localhost:3000/users)


### Possible errors and what to do
##### Error #1
Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
##### What to do
run the following query
```
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password'
```
##### reference
* [https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server](https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server)
* [https://github.com/mysqljs/mysql/pull/1962](https://github.com/mysqljs/mysql/pull/1962)


### Useful resources
* [http://macappstore.org/mysqlworkbench/](http://macappstore.org/mysqlworkbench/)
* [http://www.mysqltutorial.org/mysql-nodejs/connect/](http://www.mysqltutorial.org/mysql-nodejs/connect/)
* [https://www.techiediaries.com/node-mysql-database-crud/](https://www.techiediaries.com/node-mysql-database-crud/)
* [https://www.tutsmake.com/node-express-js-creating-a-restful-crud-api-with-mysql/](https://www.tutsmake.com/node-express-js-creating-a-restful-crud-api-with-mysql/)
