import connection from "../config/database";

const userInfo = async (data) => {
    try {
        let [r1, f1] = await connection.query(
            `select * from khachhang
            where USER_NAME = ?`,
            [data.username]
        );
        return {
            EM: "Thành công !",
            EC: "0",
            DT: r1[0],
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

const editProfile = async (data) => {
    try {
        await connection.query(
            `update khachhang
            set KH_NAME = ?, KH_SDT = ?, KH_ADDRESS = ?, KH_CCCD = ?, KH_GIOITINH = ?
            where USER_NAME = ?`,
            [data.name, data.phone, data.address, data.CCCD, data.gender, data.username]
        );
        return {
            EM: "Cập nhật thông tin thành công !",
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
    userInfo,
    editProfile,
};
