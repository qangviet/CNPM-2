import connection from "../config/database";

const createFeedback = async (data) => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth()+1;
    const year = date.getFullYear();
    const fb_time = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    const fb_id = data.khId + data.fbTime;
    try {
        await connection.query(
            `insert into feedback values (?, ?, ?, ?, ?)`,
            [fb_id, fb_time, data.fbRating, data.text, data.khId]
        );

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

const checkfbID = async (id) => {
    try {
        const [result, fields] = await connection.query(
            `select FB_ID from feedback where FB_ID = ? LIMIT 1`,
            [id]
        );
        return result.length > 0;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const deleteFeedback = async (data) => {
    try {
        let check = await checkfbID(data.id);
        if (check) {
            await connection.query(
                `delete from feedback where FB_ID = ?`,
                [data.id]
            );
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
            `select * from feedback ORDER BY fb_time desc limit 5;`
        );

        return {
            EM: "Lấy dữ liệu thành công!",
            EC: "0",
            DT: {
                feedbacks: result || [],
            },
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
