import React, { useState } from "react";
import "./Feedback.scss"; // Import the CSS file
import Modal from "react-modal";

const Feedback = () => {
    Modal.setAppElement("#root");

    const feedbackRateData = [
        {
            rating: 5,
            count: 100,
            rate: 70,
        },
        {
            rating: 4,
            count: 20,
            rate: 5,
        },
        {
            rating: 3,
            count: 10,
            rate: 10,
        },
        {
            rating: 2,
            count: 5,
            rate: 10,
        },
        {
            rating: 1,
            count: 10,
            rate: 5,
        },
    ];

    const feedbackData = [
        {
            name: "Nguyễn Tuấn",
            time: "22-11-2003 12:46",
            rate: 3,
            text: "Tôi vô cùng hài lòng với kỳ nghỉ tại Hust Stay Smart. Phòng ốc sạch sẽ, tiện nghi và thoải mái. Dịch vụ khách hàng xuất sắc, nhân viên thân thiện và hỗ trợ nhiệt tình. Tuy nhiên, Wi-Fi trong phòng hơi chậm. Chắc chắn sẽ giới thiệu cho bạn bè và quay lại trong tương lai!",
        },
        {
            name: "Trương Nam",
            time: "22-11-2003 12:46",
            rate: 4,
            text: "Tôi vô cùng hài lòng với kỳ nghỉ tại Hust Stay Smart. Phòng ốc sạch sẽ, tiện nghi và thoải mái. Dịch vụ khách hàng xuất sắc, nhân viên thân thiện và hỗ trợ nhiệt tình. Tuy nhiên, Wi-Fi trong phòng hơi chậm. Chắc chắn sẽ giới thiệu cho bạn bè và quay lại trong tương lai!",
        },
        {
            name: "Lê Thu",
            time: "22-11-2003 12:46",
            rate: 5,
            text: "Tôi vô cùng hài lòng với kỳ nghỉ tại Hust Stay Smart. Phòng ốc sạch sẽ, tiện nghi và thoải mái. Dịch vụ khách hàng xuất sắc, nhân viên thân thiện và hỗ trợ nhiệt tình. Tuy nhiên, Wi-Fi trong phòng hơi chậm. Chắc chắn sẽ giới thiệu cho bạn bè và quay lại trong tương lai!",
        },
        {
            name: "Quang Việt",
            time: "22-11-2003 12:46",
            rate: 4,
            text: "Tôi vô cùng hài lòng với kỳ nghỉ tại Hust Stay Smart. Phòng ốc sạch sẽ, tiện nghi và thoải mái. Dịch vụ khách hàng xuất sắc, nhân viên thân thiện và hỗ trợ nhiệt tình. Tuy nhiên, Wi-Fi trong phòng hơi chậm. Chắc chắn sẽ giới thiệu cho bạn bè và quay lại trong tương lai!",
        },
        {
            name: "Nguyễn Thị",
            time: "22-11-2003 12:46",
            rate: 1,
            text: "Tôi vô cùng hài lòng với kỳ nghỉ tại Hust Stay Smart. Phòng ốc sạch sẽ, tiện nghi và thoải mái. Dịch vụ khách hàng xuất sắc, nhân viên thân thiện và hỗ trợ nhiệt tình. Tuy nhiên, Wi-Fi trong phòng hơi chậm. Chắc chắn sẽ giới thiệu cho bạn bè và quay lại trong tương lai!",
        },
    ];

    const customStyles = {
        content: {
            top: "35%",
            left: " 50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };

    const [modalWrite, setModalWrite] = useState(false);

    const openModalWrire = () => {
        setModalWrite(true);
    };
    const closeModalWrite = () => {
        setModalWrite(false);
    };

    return (
        <>
            <Modal
                isOpen={modalWrite}
                onRequestClose={closeModalWrite}
                style={customStyles}
                contentLabel="Viết Feedback"
            >
                <p>Đánh giá, bình luận về phòng và các dịch vụ của khách sạn</p>
            </Modal>
            <div className="fb-container">
                <h1>FEEDBACK</h1>
                <h2>KHÁCH HÀNG NHẬN XÉT</h2>
                <div className="fb-rate-container">
                    <div className="avg-rate-container">
                        <p>Đánh giá trung bình</p>
                        <p className="avg-rate">5 / 5</p>
                        <p style={{ color: "gray" }}>(92) đánh giá</p>
                    </div>
                    <div className="fb-rate-star">
                        {feedbackRateData.map((f, index) => (
                            <div>
                                <p>{f.rating}</p>
                                <img
                                    src={`${process.env.PUBLIC_URL}/Images/Icon/star.png`}
                                    alt="star"
                                />
                                <div
                                    className="rate-slider"
                                    style={{
                                        backgroundImage: `linear-gradient(to right, green ${f.rate}%, white ${f.rate}%)`,
                                    }}
                                ></div>
                            </div>
                        ))}
                    </div>
                    <div className="avg-rate-container">
                        <p>Chia sẻ nhận xét của nhận</p>
                        <button className="btn-write-feedback" onClick={openModalWrire}>
                            Viết đánh giá của bạn
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Feedback;
