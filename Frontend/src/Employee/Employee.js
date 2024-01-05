import React, { useEffect } from "react";
import { useState } from "react";
// import "./Employee.scss";
import Topbar from "./Topbar";
import ConfirmBook from "./ConfirmBook/ConfirmBook";
import ConfirmPayment from "./ConfirmPayment/ConfirmPayment";
const Admin = () => {
    const [choice, setChoice] = useState({
        isBook: false,
        isPayment: false,
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
                            }));
                        }}
                        className={choice.isPayment ? "ad-sidebar-choice" : ""}
                    >
                        Xác nhận thanh toán
                    </div>
                </div>
                <div className="admin-content" id="employee-content">
                    {choice.isBook && <ConfirmBook></ConfirmBook>}
                    {choice.isPayment && <ConfirmPayment></ConfirmPayment>}
                </div>
            </div>
        </>
    );
};

export default Admin;
