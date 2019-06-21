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
    connection.query("SHOW tables;", function(err, response) {
        if (err) throw err;
        let tableArray = [];
        for(let i = 0; i < response.length; i++) {
            console.log(response[i]);
            Object.entries(response[i]).forEach(p => {
                tableArray.push(p[1]);
            });
        }
        connection.tables = tableArray;
        console.log(connection.tables);
    }); 
    // console.log(connection.tables)
});

module.exports = connection;