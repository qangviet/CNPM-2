import { registerNewUser, handleUserLogin } from "../services/RegisterLogin";
import {
    emptyRoom,
    createBookDetails,
    bookData,
    confirmBook,
    declineBook,
    bookHistory,
} from "../services/BookRoom";
import { createRoom, readRoom, deleteRoom, updateRoom } from "../services/CRUDRoom";

import { userInfo, editProfile } from "../services/EditProfile";

import { readService, createService, deleteService, updateService } from "../services/CRUDService";
import sharp from "sharp";
import fs from "node:fs";

/**
 *
 * @param {fullname, phone, username, password} req.body
 * @param {*} res
 * @returns
 */
const handleRegister = async (req, res) => {
    try {
        if (!req.body.fullname || !req.body.phone || !req.body.username || !req.body.password) {
            return res.status(200).json({
                EM: "Missing required parameters",
                EC: "1",
                DT: "", //data
            });
        }
        //Create user
        let data = await registerNewUser(req.body);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT, //data
        });
    } catch (error) {
        return res.status(500).json({
            EM: "error from server", //error message
            EC: "-1", //error code
            DT: "", //data
        });
    }
};
/**
 *
 * @param {username, password} req.body
 * @param {*} res
 * @returns
 */
const handleLogin = async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(200).json({
                EM: "Missing required parameters",
                EC: "1",
                DT: "",
            });
        }
        let data = await handleUserLogin(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        return res.status(500).json({
            EM: "error from server", //error message
            EC: "-1", //error code
            DT: "data", //data
        });
    }
};

const getEmptyRoom = async (req, res) => {
    try {
        let data = await emptyRoom(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from server", //error message
            EC: "-1", //error code
            DT: "data", //data
        });
    }
};

const handleBookRoom = async (req, res) => {
    try {
        let data = await createBookDetails(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from server", //error message
            EC: "-1", //error code
            DT: "data", //data
        });
    }
};

const handleCreateRoom = async (req, res) => {
    try {
        let data = await createRoom(req.body);
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

const getRoom = async (req, res) => {
    try {
        let data = await readRoom(req.body);
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

const handleDeleteRoom = async (req, res) => {
    try {
        let data = await deleteRoom(req.body);
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

const handleUpdateRoom = async (req, res) => {
    try {
        let data = await updateRoom(req.body);
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

const handleUploadImage = async (req, res) => {
    try {
        const newFilePath = req.file.destination + "\\" + req.body.id + ".jpg";
        console.log(newFilePath);
        await sharp(req.file.path)
            .resize(720, 540)
            .toFile(newFilePath)
            .then((info) => console.log(info))
            .catch((err) => console.error(err));
        if (fs.existsSync(req.file.path)) {
            try {
                fs.unlinkSync(req.file.path);
                console.log("Xóa thành công !");
            } catch (err) {
                console.error("Có lỗi khi xóa file:", err);
            }
        } else {
            console.log("File không tồn tại, không thể xóa");
        }
        return res.status(200).json({
            EM: "Upload thành công !",
            EC: "0",
            DT: "",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "Upload không thành công !",
            EC: "-1",
            DT: "",
        });
    }
};

const getBookData = async (req, res) => {
    try {
        let data = await bookData();
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

const handleConfirmBook = async (req, res) => {
    try {
        let data = await confirmBook(req.body);
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

const handleDeclineBook = async (req, res) => {
    try {
        let data = await declineBook(req.body);
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

const getUserInfo = async (req, res) => {
    try {
        let data = await userInfo(req.body);
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

const handleEditProfile = async (req, res) => {
    try {
        let data = await editProfile(req.body);
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

const getBookHistory = async (req, res) => {
    try {
        let data = await bookHistory(req.body);
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

const getServiceData = async (req, res) => {
    try {
        let data = await readService();
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

const handleCreateService = async (req, res) => {
    try {
        let data = await createService(req.body);
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

const handleDeleteService = async (req, res) => {
    try {
        let data = await deleteService(req.body);
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

const handleUpdateService = async (req, res) => {
    try {
        let data = await updateService(req.body);
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
    handleRegister,
    handleLogin,
    getEmptyRoom,
    handleBookRoom,
    handleCreateRoom,
    getRoom,
    handleDeleteRoom,
    handleUpdateRoom,
    handleUploadImage,
    getBookData,
    handleConfirmBook,
    handleDeclineBook,
    getUserInfo,
    handleEditProfile,
    getBookHistory,
    getServiceData,
    handleCreateService,
    handleDeleteService,
    handleUpdateService,
};
