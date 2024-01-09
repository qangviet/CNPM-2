import connection from "../config/database";

const readUser = async () => {
    try {
        let [r, f] = await connection.query(`select * from khachhang`);
        return {
            EM: "",
            EC: "0",
            DT: r,
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "database is error",
            EC: "-1",
            DT: "",
        };
    }
};

module.exports = {
    readUser,
};
