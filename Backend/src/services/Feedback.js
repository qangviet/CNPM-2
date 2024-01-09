import connection from "../config/database";

const checkfbID = async (id) => {
    try {
        const [result, fields] = await connection.query(
            `select FB_ID from feedback where FB_ID = ?`,
            [id]
        );
        return result.length > 0;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const generateID = async () => {
    const randomNumber = Math.random();
    let id;
    id = Math.floor(randomNumber * 10000000);
    let chk = await checkfbID(id);
    if (!chk) {
        id = Math.floor(randomNumber * 10000000);
    }
    return id;
};

/**
 *
 * @param {khID, time, rate, text} data
 * @returns
 */
const createFeedback = async (data) => {
    let id = await generateID();
    try {
        await connection.query(`insert into feedback values (?, ?, ?, ?, ?)`, [
            id,
            data.time,
            data.rate,
            data.text,
            data.khID,
        ]);
        return {
            EM: "Thêm mới feedback thành công!",
            EC: "0",
            DT: "",
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "Lỗi khi thêm mới feedback",
            EC: "-1",
            DT: "",
        };
    }
};

const deleteFeedback = async (data) => {
    try {
        let check = await checkfbID(data.id);
        if (check) {
            await connection.query(`delete from feedback where FB_ID = ?`, [data.id]);
            return {
                EM: "Xóa feedback thành công !",
                EC: "0",
                DT: "",
            };
        } else {
            return {
                EM: "Không tồn tại fb !",
                EC: "1",
                DT: "",
            };
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "database is error",
            EC: -1,
            DT: "",
        };
    }
};

const calculateAverageRating = async () => {
    try {
        const [result, fields] = await connection.query(
            `select avg(fb_rating) as averageRating from feedback`
        );
        const averageRating = result[0].averageRating;
        return {
            EM: "Tính giá trị trung bình thành công!",
            EC: "0",
            DT: {
                averageRating: averageRating || 0,
            },
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "Lỗi khi tính giá trị trung bình",
            EC: "-1",
            DT: "",
        };
    }
};

const recentFeedback = async () => {
    try {
        const [result, fields] = await connection.query(
            `select * from feedback f 
            join khachhang kh on f.KH_ID = kh.KH_ID
            ORDER BY fb_time desc;`
        );
        return {
            EM: "Lấy dữ liệu thành công!",
            EC: "0",
            DT: result,
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "Lỗi khi lấy dữ liệu",
            EC: "-1",
            DT: "",
        };
    }
};

module.exports = {
    createFeedback,
    deleteFeedback,
    calculateAverageRating,
    recentFeedback,
};
