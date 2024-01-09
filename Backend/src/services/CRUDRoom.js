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
            (?, ?, ?, ?, 1)`,
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

const compareTime = (input) => {
    const inputDate = new Date(input);
    inputDate.setHours(0, 0, 0, 0);

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const oneDay = 24 * 60 * 60 * 1000; // số milliseconds trong một ngày
    const timeDifference = currentDate - inputDate;

    return timeDifference >= oneDay;
};

const deleteRoom = async (data) => {
    try {
        let [r1, f1] = await connection.query(
            `select CheckInDate, CheckOutDate
            from reservation where ROOM_ID = ?`,
            [data.id]
        );
        for (const r of r1) {
            let chk = compareTime(r.CheckOutDate);
            if (!chk)
                return {
                    EM: "Phòng vẫn đang được sử dụng. Không thể xóa!",
                    EC: "1",
                    DT: "",
                };
        }
        let [r2, f2] = await connection.query(
            `select RESERVATION_ID from reservation
            where ROOM_ID = ?`,
            [data.id]
        );
        for (const rs of r2) {
            await connection.query(
                `delete from bill
                where RESERVATION_ID = ?`,
                [rs.RESERVATION_ID]
            );
            await connection.query(
                `delete from reservation
                where RESERVATION_ID = ?`,
                [rs.RESERVATION_ID]
            );
        }
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
/**
 *
 * @param {id, lock} data
 * @returns
 */
const lockRoom = async (data) => {
    try {
        await connection.query(
            `update room 
            set ROOM_LOCK = ?
            where ROOM_ID = ?`,
            [data.lock, data.id]
        );
        let EM;
        if (data.lock === 1) {
            EM = "Đã mở khóa phòng thành công!";
        } else {
            EM = "Đã khóa phòng thành công!";
        }
        return {
            EM,
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
    lockRoom,
};
