import React, { useState } from "react";
import "./UserProfile.css"; // Import CSS file for styling
import BookRoomHistory from "./BookRoomHistory";
import Profile from "./Profile";
import ChangePassword from "./ChangePassword";
import Service from "./Service";
import PaymentHistory from "./PaymentHistory";
import BookServiceHistory from "./BookServiceHistory";
const UserProfile = () => {
    const [choice, setChoice] = useState({
        isProfile: false,
        isService: false,
        isBookRoomHistory: false,
        isPaymentHistory: false,
        isChangePassword: false,
        isBookServiceHisory: false,
    });

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <div
                    onClick={() => {
                        setChoice({
                            isProfile: true,
                            isBookRoomHistory: false,
                            isService: false,
                            isPaymentHistory: false,
                            isChangePassword: false,
                            isBookServiceHisory: false,
                        });
                    }}
                    className={choice.isProfile ? "ad-sidebar-choice" : ""}
                >
                    Thông tin cá nhân
                </div>
                <div
                    onClick={() => {
                        setChoice({
                            isProfile: false,
                            isBookRoomHistory: true,
                            isService: false,
                            isPaymentHistory: false,
                            isChangePassword: false,
                            isBookServiceHisory: false,
                        });
                    }}
                    className={choice.isBookRoomHistory ? "ad-sidebar-choice" : ""}
                >
                    Lịch sử đặt phòng
                </div>
                <div
                    onClick={() => {
                        setChoice({
                            isProfile: false,
                            isBookRoomHistory: false,
                            isService: true,
                            isPaymentHistory: false,
                            isChangePassword: false,
                            isBookServiceHisory: false,
                        });
                    }}
                    className={choice.isService ? "ad-sidebar-choice" : ""}
                >
                    Đặt dịch vụ
                </div>
                <div
                    onClick={() => {
                        setChoice({
                            isProfile: false,
                            isBookRoomHistory: false,
                            isService: false,
                            isPaymentHistory: false,
                            isChangePassword: false,
                            isBookServiceHisory: true,
                        });
                    }}
                    className={choice.isBookServiceHisory ? "ad-sidebar-choice" : ""}
                >
                    Lịch sử đặt dịch vụ
                </div>
                <div
                    onClick={() => {
                        setChoice({
                            isProfile: false,
                            isBookRoomHistory: false,
                            isService: false,
                            isPaymentHistory: true,
                            isChangePassword: false,
                            isBookServiceHisory: false,
                        });
                    }}
                    className={choice.isPaymentHistory ? "ad-sidebar-choice" : ""}
                >
                    Lịch sử thanh toán
                </div>
                <div
                    onClick={() => {
                        setChoice({
                            isProfile: false,
                            isService: false,
                            isBookRoomHistory: false,
                            isPaymentHistory: false,
                            isChangePassword: true,
                        });
                    }}
                    className={choice.isPayment ? "ad-sidebar-choice" : ""}
                >
                    Đổi mật khẩu
                </div>
            </div>
            <div className="admin-content" id="employee-content">
                {choice.isProfile && <Profile></Profile>}
                {choice.isBookRoomHistory && <BookRoomHistory></BookRoomHistory>}
                {choice.isService && <Service></Service>}
                {choice.isPaymentHistory && <PaymentHistory></PaymentHistory>}
                {choice.isChangePassword && <ChangePassword></ChangePassword>}
                {choice.isBookServiceHisory && <BookServiceHistory></BookServiceHistory>}
            </div>
        </div>
    );
};

export default UserProfile;
