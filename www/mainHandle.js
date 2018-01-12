
var mysql = null;
var connection = null;

define(function (require) {
    mysql = require('mysql');
});    



function MySQLStorageHandle() {
}

/**
 * connect
 * establish a connection with a MySQL server
 * 
 * When exposing MySQL connection credentials, this user should have read-only privileges
 * 
 * @param {string} dbuser 
 * @param {string} dbpass 
 * @param {string} dbhost 
 * @param {string} dbname 
 */
MySQLStorageHandle.prototype.connect = function(dbuser, dbpass, dbhost, dbname) {
    connection = mysql.createConnection({
        host     : dbhost,
        user     : dbuser,
        password : dbpass,
        database : dbname
    });
    connection.connect();
}
/**
 * close
 * to close an existing connection wiht a MySQL server
 */
MySQLStorageHandle.prototype.close = function() {
    connection.end();
}

/**
 * query
 * performs a SQL query
 * 
 * @param {string} sql 
 */
MySQLStorageHandle.prototype.query = function(sql) {
    connection.query(sql,function (error, results, fields){
        if (error) throw error;
        return results[0].solution;
    });
}

var storageMySQLHandle = new MySQLStorageHandle();
module.exports = storageMySQLHandle;
