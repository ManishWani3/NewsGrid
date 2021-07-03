const mysql = require("mysql");
const path = require("path");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

exports.submitdata = async (req, res) => {


    console.log(req.body);
    const { id, fname, email, bio, newsdate, newsaddress, newscity, newsstate, newscountry, newszipcode, news } = req.body;
    const files = req.files.files1;


    if (!req.files)
        return res.status(400).send('No files were uploaded.');


    try {
        let promises = [];
        files.forEach((file) => {
            const savepath = path.join(__dirname, "../img", "uploaded_files", file.name)
            db.query("INSERT INTO `files`(`id`,`file`) VALUES ('" + id + "','" + file.name + "')");
            promises.push(file.mv(savepath))
        });

        await Promise.all(promises);

        db.query("INSERT INTO newsdata SET ?",
            {
                id: id,
                name: fname,
                email: email,
                bio: bio,
                newsdate: newsdate,
                newsaddress: newsaddress,
                newscity: newscity,
                newsstate: newsstate,
                newscountry: newscountry,
                newszipcode: newszipcode,
                news: news,
            }, (error, result) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(result);
                    return res.render("index");
                }
            });
    } catch (error) {
        console.log(error);
        res.send("Error uploading files....")
    }
};
