const path = require("path");
require("dotenv").config({
	path: path.resolve(__dirname, "..", ".env"),
	override: true,
});

const express = require('express');
const cors = require('cors');
const routes = require("./routes/routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", routes);

module.exports = app;

