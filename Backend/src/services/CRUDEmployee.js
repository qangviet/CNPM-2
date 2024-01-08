import connection from "../config/database";

const checkId = async (id) => {
    try {
        console.log(id);
        let [r, f] = await connection.query(
            `select * from nhanvien
            where NV_ID = ?`,
            [id]
        );
        if (r.length === 0) return false;
        return true;
    } catch (error) {
        console.log(error);
    }
};

const checkUsername = async (username) => {
    let [r, f] = await connection.query(
        `select USER_NAME from user
        where USER_NAME = ?`,
        [username]
    );
    if (r.length === 0) return false;
    return true;
};

const readEmployee = async () => {
    try {
        const [r, f] = await connection.query(
            `select * from nhanvien nv
            join user u on nv.USER_NAME = u.USER_NAME `
        );
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
/**
 *
 * @param {id, name, phone, cccd, address, username, password} data
 * @returns
 */
const createEmployee = async (data) => {
    try {
        console.log(data);
        let chk = await checkUsername(data.username);
        if (chk) {
            return {
                EM: "Username đã tồn tại!",
                EC: "1",
                DT: "",
            };
        }
        chk = await checkId(data.id);
        if (chk) {
            return {
                EM: "ID đã tồn tại!",
                EC: "1",
                DT: "",
            };
        }
        await connection.query(
            `insert into user values
            (?, ?, ?)`,
            [data.username, data.password, 2]
        );
        await connection.query(
            `insert into nhanvien values
            (?, ?, ?, ?, ?, ?)`,
            [data.id, data.name, data.phone, data.cccd, data.address, data.username]
        );
        return {
            EM: "Thành công",
            EC: "0",
            DT: "",
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
/**
 *
 * @param {id, username} data
 * @returns
 */
const deleteEmployee = async (data) => {
    try {
        await connection.query(
            `update reservation
            set NV_ID = NULL
            where NV_ID = ?
            `,
            [data.id]
        );
        await connection.query(
            `delete from nhanvien
            where NV_ID = ?`,
            [data.id]
        );
        await connection.query(
            `delete from user
            where USER_NAME = ?`,
            [data.username]
        );
        return {
            EM: "Xóa thông tin nhân viên thành công!",
            EC: "0",
            DT: "",
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

/**
 *
 * @param {username, pass, identity: 2, id, name, phone, cccd, address} data
 * @returns
 */
const updateEmployee = async (data) => {
    try {
        await connection.query(
            `update nhanvien 
            set NV_ID = ?, NV_NAME = ?, NV_SDT = ?, NV_CCCD = ?, NV_ADDRESS = ?
            where NV_ID = ?`,
            [data.id, data.name, data.phone, data.cccd, data.address, data.id]
        );
        await connection.query(
            `update user
            set USER_NAME = ?, USER_PASS = ?
            where USER_NAME = ?`,
            [data.username, data.password, data.username]
        );
        return {
            EM: "Sửa thông tin nhân viên thành công!",
            EC: "0",
            DT: "",
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
    readEmployee,
    createEmployee,
    deleteEmployee,
    updateEmployee,
};
