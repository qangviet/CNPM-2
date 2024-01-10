import connection from "../config/database";

const getRevenue = async () => {
    try {
        let [r1, f1] = await connection.query(
            `select sum(Total) as allRevenue from bill
            where BILL_STATUS = 2`
        );
        let [r2, f2] = await connection.query(
            `select count(RESERVATION_ID) as countRoom
            from bill
            where ISNULL(RESERVATION_ID) IS NOT TRUE`
        );
        let [r3, f3] = await connection.query(
            `select sum(TOTAL) as rRevenue
            from bill
            where ISNULL(RESERVATION_ID) IS NOT TRUE
                AND BILL_STATUS = 2`
        );
        let [r4, f4] = await connection.query(
            `select count(SH_ID) as countService
            from bill
            where ISNULL(SH_ID) IS NOT TRUE`
        );
        let [r5, f5] = await connection.query(
            `select sum(TOTAL) as svRevenue
            from bill
            where ISNULL(SH_ID) IS NOT TRUE
                AND BILL_STATUS = 2`
        );
        return {
            EM: "",
            EC: "0",
            DT: {
                allRevenue: r1[0].allRevenue,
                countRoom: r2[0].countRoom,
                rRevenue: r3[0].rRevenue,
                countService: r4[0].countService,
                svRevenue: r5[0].svRevenue,
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

const reportRoom = async (data) => {
    try {
        let [r1, f1] = await connection.query(
            `SELECT
            YEAR(create_at) AS Year,
            MONTH(create_at) AS Month,
            COUNT(*) AS COUNT
        FROM
            reservation
        WHERE 
            RESERVATION_STATUS = 1
            AND YEAR(create_at) = ?
        GROUP BY
            YEAR(create_at),
            MONTH(create_at)`,
            [data.year]
        );
        let [r2, f2] = await connection.query(
            `SELECT 
            YEAR(BILL_TIME) AS Year,
            MONTH(BILL_TIME) AS Month,
            SUM(TOTAL) as INCOME
        FROM 
            bill
        WHERE 
            ISNULL(RESERVATION_ID) IS NOT TRUE
            AND BILL_STATUS = 2
            AND YEAR(BILL_TIME) = ?
        GROUP BY
            YEAR(BILL_TIME),
            MONTH(BILL_TIME)`,
            [data.year]
        );
        return {
            EM: "",
            EC: "0",
            DT: {
                book: r1,
                income: r2,
            },
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "Database is error",
            EC: "-1",
            DT: "",
        };
    }
};

const reportService = async (data) => {
    let [r1, f1] = await connection.query(
        `SELECT
            YEAR(create_at) AS Year,
            MONTH(create_at) AS Month,
            COUNT(*) AS COUNT
        FROM
            service_history
        WHERE 
            STATUS = 1
            AND YEAR(create_at) = ?
        GROUP BY
            YEAR(create_at),
            MONTH(create_at)`,
        [data.year]
    );
    let [r2, f2] = await connection.query(
        `SELECT
            YEAR(BILL_TIME) AS Year,
            MONTH(BILL_TIME) AS Month,
            SUM(TOTAL) AS INCOME
        FROM
            bill
        WHERE 
            BILL_STATUS = 2
            AND ISNULL(SH_ID) IS NOT TRUE
            AND YEAR(BILL_TIME) = ?
        GROUP BY
            YEAR(BILL_TIME),
            MONTH(BILL_TIME)`,
        [data.year]
    );
    return {
        EM: "",
        EC: "0",
        DT: {
            book: r1,
            income: r2,
        },
    };
};

const reportAll = async (data) => {
    try {
        let [r, f] = await connection.query(
            `SELECT 
                YEAR(BILL_TIME) AS Year,
                MONTH(BILL_TIME) AS Month,
                SUM(TOTAL) AS INCOME
            FROM
                bill
            WHERE 
                BILL_STATUS = 2
                AND YEAR(BILL_TIME) = ?
            GROUP BY
            YEAR(BILL_TIME),
            MONTH(BILL_TIME)`,
            [data.year]
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
    getRevenue,
    reportRoom,
    reportService,
    reportAll,
};
