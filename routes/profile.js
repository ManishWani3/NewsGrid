const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

exports.profile = (req, res) => {

    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }
    var id = localStorage.getItem("myFirstKey");
    console.log(id);

    var sql = "SELECT * FROM `users` WHERE `id`='" + id + "'";
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.render("user-profile.hbs", { data: result });
        console.log(result);

    });
};

