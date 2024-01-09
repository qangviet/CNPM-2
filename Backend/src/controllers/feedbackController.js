import {
    createFeedback,
    deleteFeedback,
    calculateAverageRating,
    recentFeedback,
} from "../services/Feedback.js";

const handleCreateFeedback = async (req, res) => {
    try {
        let data = await createFeedback(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: "",
        });
    }
};

const handleDeleteFeedback = async (req, res) => {
    try {
        let data = await deleteFeedback(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: "",
        });
    }
};

const getDisplayRating = async (req, res) => {
    try {
        let data = await calculateAverageRating(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: "",
        });
    }
};

const getRecentFeedback = async (req, res) => {
    try {
        let data = await recentFeedback();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: "",
        });
    }
};

module.exports = {
    handleCreateFeedback,
    handleDeleteFeedback,
    getDisplayRating,
    getRecentFeedback,
};
