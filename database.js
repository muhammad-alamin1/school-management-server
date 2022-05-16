const mySql = require("mysql");

// connect mysql database
let connection = mySql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});

connection.connect((err) => {
  if (err) {
    return console.error("error: " + err.message);
  }

  console.log(`Connected to the MySQL server.`);
});

module.exports = connection;
