//Method render
import express from "express";
import apiController from "../controllers/apiController";
import apiController2 from "../controllers/apiController2";
import multer from "multer";
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "..", "..", "Frontend", "public", "Images", "Rooms"));
        // cb(null, path.join(__dirname, "..", "public", "images", "upload"));
    },
    filename: (req, file, cb) => {
        cb(null, "image" + Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

const initApiRoutes = (app) => {
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);

    router.post("/edit-profile", apiController.handleEditProfile);
    router.post("/user-info", apiController.getUserInfo);

    router.post("/crud-room/create", apiController.handleCreateRoom);
    router.get("/crud-room/read", apiController.getRoom);
    router.post("/crud-room/delete", apiController.handleDeleteRoom);
    router.post("/crud-room/update", apiController.handleUpdateRoom);

    router.post("/upload-image", upload.single("image"), apiController.handleUploadImage);
    router.post("/empty-room", apiController.getEmptyRoom);
    router.post("/book-room", apiController.handleBookRoom);
    router.post("/confirm-book", apiController.handleConfirmBook);
    router.get("/book-data", apiController.getBookData);
    router.post("/decline-book", apiController.handleDeclineBook);
    router.post("/book-history", apiController.getBookHistory);

    router.get("/crud-service/read", apiController.getServiceData);
    router.post("/crud-service/create", apiController.handleCreateService);
    router.post("/crud-service/delete", apiController.handleDeleteService);
    router.post("/crud-service/update", apiController.handleUpdateService);

    router.post("/book-service/check", apiController2.checkBookRoom);
    router.post("/book-service/book", apiController2.handleBookService);
    router.post("/book-service/history", apiController2.getServiceHistory);
    router.post("/book-service/cancel", apiController2.handleCancelService);

    router.post("/payment/bill-data-by-id", apiController2.getBillDataById);
    return app.use("/api", router);
};

export default initApiRoutes;