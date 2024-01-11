import connection from "../config/database";

const generateID = () => {
    let id = Date.now().toString();
    if (id.length > 8) {
        id = id.substring(2, 9);
    }
    return id;
};

const allBookRoom = async () => {
    try {
        const [r, f] = await connection.query(
            `select * 
            from reservation rs 
            join room r on r.ROOM_ID = rs.ROOM_ID
            join khachhang kh on rs.KH_ID = kh.KH_ID
            order by CheckInDate asc    `
        );
        return {
            EM: "",
            EC: "0",
            DT: r,
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "database error",
            EC: "-1",
            DT: "",
        };
    }
};

const emptyRoom = async (data) => {
    try {
        const [r1, f1] = await connection.query(
            `select * from room
            where ROOM_ID not in (
                select ROOM_ID from reservation
                    where ((? <= CheckInDate AND CheckInDate <= ?) 
                       or(? <= CheckOutDate and CheckOutDate <= ?))
            	AND RESERVATION_STATUS in (0, 1))
                AND ROOM_LOCK = 1`,
            [data.checkIn, data.checkOut, data.checkIn, data.checkOut]
        );
        return {
            EM: "Thành công !",
            EC: "0",
            DT: r1,
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "database error",
            EC: "-1",
            DT: "",
        };
    }
};
const createBookDetails = async (bookData) => {
    try {
        let [r1, f1] = await connection.query(
            `select KH_ID from khachhang
            where USER_NAME = ?`,
            [bookData.username]
        );
        await connection.query(
            `insert into reservation (RESERVATION_ID, CheckInDate, CheckOutDate, KH_ID, ROOM_ID, RESERVATION_STATUS)
            values(?, ?, ?, ?, ?, ?)`,
            [generateID(), bookData.checkIn, bookData.checkOut, r1[0].KH_ID, bookData.room_id, 0]
        );
        return {
            EM: "Bạn đã đặt phòng thành công. Vui lòng chờ nhân viên xử lý!",
            EC: "0",
            DT: "",
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "database error",
            EC: "-1",
            DT: "",
        };
    }
};
const bookData = async () => {
    try {
        const [r1, f1] = await connection.query(
            `select * 
            from reservation rs
                join khachhang kh on kh.KH_ID = rs.KH_ID 
                join room r on rs.ROOM_ID = r.ROOM_ID
            where RESERVATION_STATUS = 0`
        );
        let res = [];
        r1.forEach((r) => {
            res.push({
                bookId: r.RESERVATION_ID,
                checkIn: r.CheckInDate,
                checkOut: r.CheckOutDate,
                userInfo: {
                    id: r.KH_ID,
                    name: r.KH_NAME,
                    phone: r.KH_SDT,
                    address: r.KH_ADDRESS,
                    gender: r.KH_GIOITINH,
                    cccd: r.KH_CCCD,
                },
                roomInfo: {
                    id: r.ROOM_ID,
                    type: r.ROOM_TYPE,
                    price: r.ROOM_PRICE,
                },
                createAt: r.create_at,
                status: r.RESERVATION_STATUS,
            });
        });
        return {
            EM: "Thành công !",
            EC: "0",
            DT: res,
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "database error",
            EC: "-1",
            DT: "",
        };
    }
};
const confirmBook = async (data) => {
    try {
        await connection.query(
            `update reservation
            set RESERVATION_STATUS = 1, NV_ID = ?
            where RESERVATION_ID = ?`,
            [data.nv_id, data.id]
        );
        return {
            EM: "Thành công !",
            EC: "0",
            DT: "",
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "database error",
            EC: "-1",
            DT: "",
        };
    }
};
const declineBook = async (data) => {
    try {
        await connection.query(
            `update reservation
            set RESERVATION_STATUS = -1, NV_ID = ?
            where RESERVATION_ID = ?`,
            [data.nv_id, data.id]
        );
        return {
            EM: "Thành công !",
            EC: "0",
            DT: "",
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "database error",
            EC: "-1",
            DT: "",
        };
    }
};

const bookHistory = async (data) => {
    try {
        let [r1, f1] = await connection.query(
            `select r.ROOM_ID as rID, ROOM_TYPE as type, ROOM_PRICE as price, CheckInDate as checkIn, CheckOutDate as checkOut, create_at as createAt, RESERVATION_STATUS as status  
            from reservation rs join room r on rs.ROOM_ID = r.ROOM_ID 
            where KH_ID = (select KH_ID from khachhang
                            where USER_NAME = ?)`,
            [data.username]
        );
        return {
            EM: "Thành công !",
            EC: "0",
            DT: r1,
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "database error",
            EC: "-1",
            DT: "",
        };
    }
};

const cancelBookRoom = async (data) => {
    try {
        await connection.query(
            `delete from bill
            where RESERVATION_ID = ?`,
            [data.rsID]
        );
        await connection.query(
            `update reservation
            set RESERVATION_STATUS = -1
            where RESERVATION_ID = ?`,
            [data.rsID]
        );
        return {
            EM: "Hủy lịch đặt phòng thành công!",
            EC: "0",
            DT: "",
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "database error",
            EC: "-1",
            DT: "",
        };
    }
};

module.exports = {
    emptyRoom,
    createBookDetails,
    bookData,
    confirmBook,
    declineBook,
    bookHistory,
    allBookRoom,
    cancelBookRoom,
};
