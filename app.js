require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const sequelize = require("./database");

// import routes & middleware
const allRoutes = require("./routes/allRoutes");

// app
const app = express();

// Static Middleware
app.use(express.static(path.join(__dirname, "public")));

// create table
// sequelize.sync({ force: true }).then(() => {
//   console.log("Create re-sync db.");
// });

// use middleware
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use routes
allRoutes(app);

// post running
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
