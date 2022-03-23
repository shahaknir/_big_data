const mysql = require('mysql');

const connectionMySQL = mysql.createConnection({
    host: '127.0.0.1',
    database: 'callcenter',
    user: 'root',
    password: '123456789',
});

connectionMySQL.connect((err) => {
    if (err) throw err;
    console.log('MySQL database is connected!');
})

module.exports = connectionMySQL;