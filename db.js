const mysql = require("mysql");
module.exports = async function getConn() {
    return mysql.createPool({
        connectionLimit: 20,
        host: "localhost",
        user: "root",
        password: "password",
        database: "census_data"
    });
};