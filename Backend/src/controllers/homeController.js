import connection from "../config/database";

const getHome = async (req, res) => {
    let [results, fields] = await connection.query(`select * from user`);

    res.render("../views/home.ejs", { listUsers: results });
};
const getNews = (req, res) => {
    res.render("../views/news.ejs");
};
const getContact = (req, res) => {
    res.send("Check Contact");
};
const getAbout = (req, res) => {
    res.render("../views/sample.ejs");
};
const postCreateUser = async (req, res) => {
    let hoten = req.body.Hoten;
    let sdt = req.body.SDT;
    let diachi = req.body.Diachi;
    let cccd = req.body.CCCD;

    let [results, fields] = await connection.query(
        `INSERT INTO user (Hoten, SDT, Diachi, CCCD)
                VALUES(?, ?, ?, ?)`,
        [hoten, sdt, diachi, cccd]
    );
    res.send("Created success");
};
const getUpdatePage = async (req, res) => {
    const user_id = req.params.id;
    let [results, fields] = await connection.query(`SELECT * FROM user WHERE id_user = ?`, [
        user_id,
    ]);
    res.render("../views/update.ejs", { user: results });
};

module.exports = {
    getHome,
    getNews,
    getContact,
    getAbout,
    postCreateUser,
    getUpdatePage,
};
