import connection from "../config/database";

const generateID = () => {
    const randomNumber = Math.random();
    return Math.floor(randomNumber * 10000000);
};

const convertDate = (input) => {
    const date = input;
    const parts = date.split("-");
    const convertedDate = parts.reverse().join("-");
    return convertedDate;
};

const getDate = async (data) => {
    try {
        let [r1, f1] = await connection.query(
            `select * from reservation
            where KH_ID = (select KH_ID from khachhang
                            where USER_NAME = ?)
                and RESERVATION_STATUS = 1
                and CheckInDate >= CURDATE()`,
            [data.username]
        );
        if (r1.length === 0) {
            return {
                EM: "Vui lòng đặt phòng trước khi đặt dịch vụ!",
                EC: "1",
                DT: "",
            };
        }
        return {
            EM: "Đã đặt phòng",
            EC: "0",
            DT: r1,
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

const bookService = async (data) => {
    try {
        let id = generateID();
        await connection.query(
            `insert into service_history (SH_ID, KH_ID, SERVICE_ID, QUANTITY, DATE, TIME, TOTAL_PRICE, STATUS) values
            (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                id,
                data.khID,
                data.id,
                data.quantity,
                convertDate(data.date),
                data.time,
                data.totalPrice,
                1,
            ]
        );
        return {
            EM: "Đặt dịch vụ thành công!",
            EC: "0",
            DT: { shID: id },
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

const history = async (data) => {
    try {
        let [r1, f1] = await connection.query(
            `select sh.SH_ID as shID, s.SERVICE_NAME as name, sh.QUANTITY as quantity, DATE as date, 
                TIME as time, TOTAL_PRICE as totalPrice, STATUS as status
            from service_history sh 
                join service s on sh.SERVICE_ID = s.SERVICE_ID
            where KH_ID = ?
            order by DATE asc, TIME asc `,
            [data.khID]
        );
        return {
            EM: "Thành công!",
            EC: "0",
            DT: r1,
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

const cancelService = async (data) => {
    try {
        await connection.query(
            `update service_history
            set STATUS = -1
            where SH_ID = ?`,
            [data.id]
        );
        await connection.query(
            `delete from bill
            where SH_ID = ?`,
            [data.id]
        );
        return {
            EM: "Hủy dịch vụ thành công!",
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

const allBookService = async () => {
    try {
        let [r, f] = await connection.query(
            `select * 
            from service_history sh
            join service s on sh.SERVICE_ID = s.SERVICE_ID
            join khachhang kh on sh.KH_ID = kh.KH_ID
            order by DATE asc, TIME asc`
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

module.exports = {
    getDate,
    bookService,
    history,
    cancelService,
    allBookService,
};
