import connection from "../config/database";

const checkID = async (id) => {
    const [r1, f1] = await connection.query(
        `select count(*) as sl
        from room where ROOM_ID = ?`,
        [id]
    );
    if (r1[0].sl === 1) return true;
    else if (r1[0].sl === 0) return false;
};

const createRoom = async (data) => {
    try {
        let check = await checkID(data.ID);
        if (check) {
            return {
                EM: "Đã tồn tại ID !",
                EC: "1",
                DT: "",
            };
        }
        await connection.query(
            `insert into room values
            (?, ?, ?, ?)`,
            [data.ID, data.type, data.price, data.desc]
        );
        return {
            EM: "Thêm mới phòng thành công !",
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

const updateRoom = async (data) => {
    try {
        await connection.query(
            `update room
            set ROOM_ID = ?, ROOM_TYPE = ?, ROOM_PRICE = ?, ROOM_DESC = ?
            where ROOM_ID = ?`,
            [data.ID, data.type, data.price, data.desc, data.ID]
        );
        return {
            EM: "Chỉnh sửa thành công !",
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

const readRoom = async () => {
    let [results, fields] = await connection.query(`select * from room`);
    return {
        EM: "Lấy danh sách phòng thành công !",
        EC: "0",
        DT: results,
    };
};

const deleteRoom = async (data) => {
    try {
        await connection.query(
            `update reservation
            set ROOM_ID = null
            where ROOM_ID = ?`,
            [data.id]
        );
        await connection.query(
            `delete from room
            where ROOM_ID = ?`,
            [data.id]
        );
        return {
            EM: "Xóa phòng thành công !",
            EC: "0",
            DT: "",
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "database is error",
            EC: -1,
            DT: "",
        };
    }
};

module.exports = {
    readRoom,
    createRoom,
    updateRoom,
    deleteRoom,
};
