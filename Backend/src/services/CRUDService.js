import connection from "../config/database";

const checkId = async (id) => {
    let [r, f] = await connection.query(
        `select * from service
        where SERVICE_ID = ?`,
        [id]
    );
    if (r.length === 0) return false;
    return true;
};

const readService = async () => {
    try {
        const [r, f] = await connection.query(`select * from service`);
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

const createService = async (data) => {
    try {
        let chk = await checkId(data.id);
        if (chk) {
            return {
                EM: "Id đã tồn tại!",
                EC: "1",
                DT: "",
            };
        }
        await connection.query(
            `insert into service values
            (?, ?, ?, ?, 1)`,
            [data.id, data.name, data.price, data.desc]
        );
        return {
            EM: "",
            EC: "0",
            DT: "Thành công",
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

const compareTime = (input) => {
    const inputDate = new Date(input);
    inputDate.setHours(0, 0, 0, 0);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    console.log(inputDate);
    console.log(currentDate);
    const oneDay = 24 * 60 * 60 * 1000; // số milliseconds trong một ngày
    const timeDifference = currentDate - inputDate;

    return timeDifference >= oneDay;
};

const deleteService = async (data) => {
    try {
        let [r1, f1] = await connection.query(
            `select DATE, SH_ID 
            from service_history
            where SERVICE_ID = ?
            `,
            [data.id]
        );
        for (const s of r1) {
            let chk = compareTime(s.DATE);
            if (!chk)
                return {
                    EM: "Dịch vẫn đang được sử dụng. Không thể xóa!",
                    EC: "1",
                    DT: "",
                };
        }
        for (const s of r1) {
            await connection.query(
                `delete from bill
                where SH_ID = ?`,
                [s.SH_ID]
            );
            await connection.query(
                `delete from service_history
                where SH_ID = ?`,
                [s.SH_ID]
            );
        }
        await connection.query(
            `delete from service
            where SERVICE_ID = ?`,
            [data.id]
        );
        return {
            EM: "Xóa dịch vụ thành công!",
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
 * @param {id, lock} data
 * @returns
 */

const lockService = async (data) => {
    try {
        await connection.query(
            `update service
            set SERVICE_LOCK = ?
            where SERVICE_ID = ?`,
            [data.lock, data.id]
        );
        let EM;
        if (data.lock === 1) {
            EM = "Đã mở khóa dịch vụ thành công!";
        } else {
            EM = "Đã khóa dịch vụ thành công!";
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
            EC: "-1",
            DT: "",
        };
    }
};

const updateService = async (data) => {
    try {
        await connection.query(
            `update service
            set SERVICE_NAME = ?, SERVICE_PRICE = ?, SERVICE_DESC = ?
            where SERVICE_ID = ?`,
            [data.name, data.price, data.desc, data.id]
        );
        return {
            EM: "Sửa thông tin dịch vụ thành công!",
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
    readService,
    createService,
    deleteService,
    updateService,
    lockService,
};
