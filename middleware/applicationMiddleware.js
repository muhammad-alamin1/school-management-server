const express = require("express");

const cors = require("cors");
const bodyParser = require("body-parser");

const applicationMiddleware = [morgan("dev"), cors()];

module.exports = applicationMiddleware;
