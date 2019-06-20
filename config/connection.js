var mysql = require("mysql");

var password;
try {
    password = require("../../password")
} catch (e) {
    if(e.code !== 'MODULE_NOT_FOUND') {
        throw e;
    }
    password = "password"
}

if(process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else{
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: password,
        database: "freespirits_db"
    });    
}

connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

module.exports = connection;