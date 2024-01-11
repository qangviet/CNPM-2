import connection from "../config/database";

const generateID = () => {
    const randomNumber = Math.random();
    return Math.floor(randomNumber * 100000000);
};
/**
 *
 * @param {khID} data
 * @returns
 */

const infoUser = async (data) => {
    try {
        let [r, f] = await connection.query(
            `select KH_NAME as name, KH_SDT as phone
            from khachhang
            where KH_ID = ?`,
            [data.id]
        );
        return {
            EM: "Thành công !",
            EC: "0",
            DT: r[0],
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

const billDataById = async (data) => {
    try {
        let [r1, f1] = await connection.query(
            `select * from bill
                where KH_ID = ?`,
            data.khID
        );
        let service = [];
        let room = [];
        for (const r of r1) {
            if (r["SH_ID"]) {
                let [r2, f2] = await connection.query(
                    `select s.SERVICE_NAME as name, sh.QUANTITY as quantity,
                        sh.DATE as date, sh.TIME as time, s.SERVICE_PRICE as price
                    from service_history sh join service s 
                        on sh.SERVICE_ID = s.SERVICE_ID
                    where SH_ID = ?`,
                    [r["SH_ID"]]
                );
                service.push({
                    ...r2[0],
                    totalPrice: r["TOTAL"],
                    billStatus: r["BILL_STATUS"],
                    billID: r.BILL_ID,
                });
            } else if (r["RESERVATION_ID"]) {
                let [r3, f3] = await connection.query(
                    `select r.ROOM_ID as rID, r.ROOM_TYPE as type, rs.CheckInDate,
                        rs.CheckOutDate, r.ROOM_PRICE as price
                    from reservation rs join room r
                        on rs.ROOM_ID = r.ROOM_ID
                    where RESERVATION_ID = ?`,
                    [r["RESERVATION_ID"]]
                );
                room.push({
                    ...r3[0],
                    totalPrice: r["TOTAL"],
                    billStatus: r["BILL_STATUS"],
                    billID: r.BILL_ID,
                });
            }
        }
        return {
            EM: "Thành công !",
            EC: "0",
            DT: {
                room,
                service,
            },
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
 * @param {reservationID, khID, total} data
 */
const createBillRoom = async (data) => {
    try {
        let bill_id = generateID();
        await connection.query(
            `insert into bill (BILL_ID, TOTAL, BILL_STATUS, RESERVATION_ID, KH_ID) values
            (?, ?, ?, ?, ?)`,
            [bill_id, data.total, 0, data.reservationID, data.khID]
        );
        return {
            EM: "Tạo bill thành công",
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
 * @param {shID, khID, total} data
 */
const createBillService = async (data) => {
    try {
        let bill_id = generateID();
        await connection.query(
            `insert into bill (BILL_ID, TOTAL, BILL_STATUS, SH_ID, KH_ID) values
            (?, ?, ?, ?, ?)`,
            [bill_id, data.total, 0, data.shID, data.khID]
        );
        return {
            EM: "Tạo bill thành công",
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
 * @param {[billTime, billID]} data
 */
const userPay = async (data) => {
    try {
        for (const r of data.bill) {
            await connection.query(
                `update bill
                set PAYMENT_METHOD = 'Chuyển khoản', BILL_TIME = ?, BILL_STATUS = 1, BILL_ID = ?
                where BILL_ID = ?`,
                [r.billTime, data.id, r.billID]
            );
        }
        return {
            EM: "Vui lòng chờ nhân viên xử lý!",
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

const getBillWaitHandle = async () => {
    let billWait = [];
    let [r1, f1] = await connection.query(
        `select distinct BILL_ID, KH_ID
        from bill
        where BILL_STATUS = 1`
    );
    for (const r of r1) {
        let [r2, f2] = await connection.query(
            `select r.ROOM_ID as roomID, r.ROOM_TYPE as roomType, rs.CheckInDate as checkIn, 
                rs.CheckOutDate as checkOut, r.ROOM_PRICE as roomPrice, b.TOTAL as total,
                b.KH_ID as khID, b.BILL_TIME as billTime   
            from bill b
                join reservation rs on b.RESERVATION_ID = rs.RESERVATION_ID
                join room r on r.ROOM_ID = rs.ROOM_ID
            where b.BILL_ID = ?`,
            [r.BILL_ID]
        );
        let [r3, f3] = await connection.query(
            `select s.SERVICE_NAME as sName, sh.QUANTITY as quantity, sh.DATE as date, sh.TIME as time,
                s.SERVICE_PRICE as sPrice, b.TOTAL as total, b.KH_ID as khID, b.BILL_TIME as billTime   
            from bill b
                join service_history sh on sh.SH_ID = b.SH_ID
                join service s on s.SERVICE_ID = sh.SERVICE_ID
            where b.BILL_ID = ?`,
            [r.BILL_ID]
        );
        billWait.push({
            khID: r.KH_ID,
            billID: r.BILL_ID,
            room: r2,
            service: r3,
        });
    }
    return billWait;
};

const getBillNotPay = async () => {
    let billNotPay = [];
    let [r1, f1] = await connection.query(
        `select distinct KH_ID
        from bill where BILL_STATUS = 0`
    );
    for (const r of r1) {
        let [r2, f2] = await connection.query(
            `select r.ROOM_ID as roomID, r.ROOM_TYPE as roomType, rs.CheckInDate as checkIn, 
            rs.CheckOutDate as checkOut, r.ROOM_PRICE as roomPrice, b.TOTAL as total,
            b.BILL_ID as billID   
        from bill b
            join reservation rs on b.RESERVATION_ID = rs.RESERVATION_ID
            join room r on r.ROOM_ID = rs.ROOM_ID
        where b.KH_ID = ? AND BILL_STATUS = 0`,
            [r.KH_ID]
        );
        let [r3, f3] = await connection.query(
            `select s.SERVICE_NAME as sName, sh.QUANTITY as quantity, sh.DATE as date, sh.TIME as time,
                s.SERVICE_PRICE as sPrice, b.TOTAL as total, b.BILL_ID as billID   
            from bill b
                join service_history sh on sh.SH_ID = b.SH_ID
                join service s on s.SERVICE_ID = sh.SERVICE_ID
            where b.KH_ID = ? AND BILL_STATUS = 0`,
            [r.KH_ID]
        );
        billNotPay.push({
            khID: r.KH_ID,
            room: r2,
            service: r3,
        });
    }
    return billNotPay;
};

const billDataEmployee = async () => {
    try {
        let waitHandle = await getBillWaitHandle();
        let notPay = await getBillNotPay();
        return {
            EM: "Thành công !",
            EC: "0",
            DT: {
                wait: waitHandle,
                notPay: notPay,
            },
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
 * @param {billID, khID} data
 */
const cancelBill = async (data) => {
    try {
        await connection.query(
            `update bill
            set BILL_STATUS = 0, PAYMENT_METHOD = null, BILL_TIME = null
            where BILL_ID = ?`,
            [data.billID]
        );
        return {
            EM: "Từ chối thành công !",
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

const confirmBill = async (data) => {
    try {
        let payMethod;
        if (data.type === "bank-tranfer") {
            payMethod = "Chuyển khoản";
        } else {
            payMethod = "Tiền mặt";
        }
        for (const b of data.ids) {
            await connection.query(
                `update bill 
                set BILL_STATUS = 2, PAYMENT_METHOD = ?, BILL_TIME = ?, BILL_ID = ?
                where BILL_ID = ?`,
                [payMethod, data.billTime, data.billID, b]
            );
        }
        return {
            EM: "Xác nhận thành công !",
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

const allBill = async () => {
    try {
        let [r1, f1] = await connection.query(
            `select BILL_ID from bill
            where BILL_STATUS = 2`
        );
        let data = [];
        for (const r of r1) {
            let [r2, f2] = await connection.query(
                `SELECT *
                FROM bill b
                LEFT JOIN reservation res ON res.RESERVATION_ID = b.RESERVATION_ID
                LEFT JOIN service_history sh ON sh.SH_ID = b.SH_ID
                JOIN khachhang kh ON kh.KH_ID = b.KH_ID
                WHERE 
                    BILL_STATUS = 2
                    AND BILL_ID = ?
                ORDER BY 
                    BILL_TIME DESC`,
                [r.BILL_ID]
            );
            data.push({
                id: r.BILL_ID,
                info: r2,
            });
        }
        return {
            EM: "",
            EC: "0",
            DT: data,
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
    infoUser,
    billDataById,
    createBillRoom,
    createBillService,
    cancelBill,
    confirmBill,
    userPay,
    billDataEmployee,
    allBill,
};
