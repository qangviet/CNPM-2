import connection from "../config/database";

const generateID = () => {
    let id = Date.now().toString();
    if (id.length > 8) {
        id = id.substring(1, 9);
    }
    return id;
};
const checkUsername = async (username) => {
    let [results, fields] = await connection.query(`select * from user where USER_NAME = ?`, [
        username,
    ]);
    return results;
};

/**
 *
 * @param {fullname, username, password, phone} UserData
 * @returns
 */
const registerNewUser = async (UserData) => {
    let res = await checkUsername(UserData.username);
    if (res.length === 1) {
        return {
            EM: "Username already exists",
            EC: "1",
            DT: "",
        };
    }
    const id = generateID();
    const fullname = UserData.fullname;
    const username = UserData.username;
    const password = UserData.password;
    const phone = UserData.phone;
    try {
        let [r1, f1] = await connection.query(
            `insert into user(USER_NAME, USER_PASS, USER_IDENTITY) 
            values (?, ?, ?)`,
            [username, password, "1"]
        );
        let [r2, f2] = await connection.query(
            `insert into khachhang(KH_ID, KH_NAME, KH_SDT, USER_NAME)
            values (?, ?, ?, ?)`,
            [id, fullname, phone, username]
        );
        return {
            EM: "Successful account registration",
            EC: "0",
            DT: "",
        };
    } catch (error) {
        return {
            EM: "Database is encountering an error",
            EC: "-1",
            DT: "",
        };
    }
};
/**
 *
 * @param {username, password} UserData
 * @returns
 */
const handleUserLogin = async (UserData) => {
    let res = await checkUsername(UserData.username);
    if (res.length === 0) {
        return {
            EM: "Username hoặc password không chính xác !",
            EC: "1",
            DT: "",
        };
    }
    const password = UserData.password;
    if (res[0].USER_PASS !== password) {
        return {
            EM: "Username hoặc password không chính xác !",
            EC: "1",
            DT: "",
        };
    }
    let name = "";
    let id = "";
    if (res[0].USER_IDENTITY === 1) {
        const [r1, f1] = await connection.query(
            `select KH_ID as id , KH_NAME as name 
            from khachhang
            where USER_NAME = ?`,
            [UserData.username]
        );
        name = r1[0].name;
        id = r1[0].id;
    } else if (res[0].USER_IDENTITY === 2) {
        const [r1, f1] = await connection.query(
            `select NV_ID as id, NV_NAME as name
            from nhanvien
            where USER_NAME = ?`,
            [UserData.username]
        );
        id = r1[0].id;
        name = r1[0].name;
    }
    return {
        EM: "Login successfully",
        EC: "0",
        DT: {
            id: id,
            name: name,
            identity: res[0].USER_IDENTITY,
        },
    };
};

module.exports = {
    registerNewUser,
    handleUserLogin,
};
