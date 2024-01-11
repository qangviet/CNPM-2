import React from "react";
import { useState } from "react";
// import "./Employee.scss";
import Topbar from "./Topbar";
import ConfirmBook from "./ConfirmBook/ConfirmBook";
import ConfirmPayment from "./ConfirmPayment/ConfirmPayment";
import BookRoomHistory from "./BookRoomHistory/BookRoomHistory";
import BookServiceHistory from "./BookServiceHistory/BookServiceHistory";
const Admin = () => {
    const [choice, setChoice] = useState({
        isBook: false,
        isPayment: false,
        isHistoryRoom: false,
        isHistoryService: false,
    });
    return (
        <>
            <Topbar></Topbar>
            <div className="admin-container">
                <div className="admin-sidebar">
                    <div
                        onClick={() => {
                            setChoice((prev) => ({
                                isBook: true,
                                isPayment: false,
                                isHistoryRoom: false,
                                isHistoryService: false,
                            }));
                        }}
                        className={choice.isBook ? "ad-sidebar-choice" : ""}
                    >
                        Xác nhận lịch đặt phòng
                    </div>
                    <div
                        onClick={() => {
                            setChoice((prev) => ({
                                isBook: false,
                                isPayment: true,
                                isHistoryRoom: false,
                                isHistoryService: false,
                            }));
                        }}
                        className={choice.isPayment ? "ad-sidebar-choice" : ""}
                    >
                        Xác nhận thanh toán
                    </div>
                    <div
                        onClick={() => {
                            setChoice((prev) => ({
                                isBook: false,
                                isPayment: false,
                                isHistoryRoom: true,
                                isHistoryService: false,
                            }));
                        }}
                        className={choice.isHistoryRoom ? "ad-sidebar-choice" : ""}
                    >
                        Lịch sử đặt phòng
                    </div>
                    <div
                        onClick={() => {
                            setChoice((prev) => ({
                                isBook: false,
                                isPayment: false,
                                isHistoryRoom: false,
                                isHistoryService: true,
                            }));
                        }}
                        className={choice.isHistoryService ? "ad-sidebar-choice" : ""}
                    >
                        Lịch sử đặt dịch vụ
                    </div>
                </div>
                <div className="admin-content" id="employee-content">
                    {choice.isBook && <ConfirmBook></ConfirmBook>}
                    {choice.isPayment && <ConfirmPayment></ConfirmPayment>}
                    {choice.isHistoryRoom && <BookRoomHistory></BookRoomHistory>}
                    {choice.isHistoryService && <BookServiceHistory></BookServiceHistory>}
                </div>
            </div>
        </>
    );
};

export default Admin;
