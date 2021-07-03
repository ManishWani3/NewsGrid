// Importing Part
const path = require("path");
const express = require("express");
const fileUpload = require("express-fileupload");
const mysql = require("mysql");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');

routes = require('./routes/profile');


//--------------------------------------------------------

// Configuring Part
var hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');



dotenv.config({ path: "./.env" });
const app = express();

const imagesDirectory = path.join(__dirname, "./img");
app.use(express.static(imagesDirectory));
const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));
//--------------------------------------------------------

// Database Connectivity
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("MYSOL Connected....");
  }
});

//-------------------------------------------------------

// fileUpload 
app.use(fileUpload());

// parsing part
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// HTML Engine i.e. hbs part
app.set("view engine", "hbs");

// All Request-Response Part
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));
app.use("/news_submission", require("./routes/news_submission"));
app.get("/profile", routes.profile);

app.listen(5000, () => {
  console.log("Server Started on port 5000");
});
