import connection from "../config/database";

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

module.exports = {
    billDataById,
};
