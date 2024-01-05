import React, { useEffect } from "react";
import { useState } from "react";
import "./Admin.scss";
import Topbar from "./Topbar";
import ManageEmployee from "./ManageEmployee/ManageEmployee";
import ManageRoom from "./ManageRoom/ManageRoom";
import ManageUser from "./ManageUser/ManageUser";
import ManageService from "./ManageService/ManageService";
import Report from "./Report/Report";
const Admin = () => {
    const [choice, setChoice] = useState({
        qlnv: false,
        qlkh: false,
        qlp: false,
        qldv: false,
        bctk: false,
    });
    return (
        <>
            <Topbar></Topbar>
            <div className="admin-container">
                <div className="admin-sidebar">
                    <div
                        onClick={() => {
                            setChoice({
                                qlnv: true,
                                qlkh: false,
                                qlp: false,
                                qldv: false,
                                bctk: false,
                            });
                        }}
                        className={choice.qlnv ? "ad-sidebar-choice" : ""}
                    >
                        Quản lý nhân viên
                    </div>
                    <div
                        onClick={() => {
                            setChoice({
                                qlnv: false,
                                qlkh: true,
                                qlp: false,
                                qldv: false,
                                bctk: false,
                            });
                        }}
                        className={choice.qlkh ? "ad-sidebar-choice" : ""}
                    >
                        Quản lý khách hàng
                    </div>
                    <div
                        onClick={() => {
                            setChoice({
                                qlnv: false,
                                qlkh: false,
                                qlp: false,
                                qldv: true,
                                bctk: false,
                            });
                        }}
                        className={choice.qldv ? "ad-sidebar-choice" : ""}
                    >
                        Quản lý dịch vụ
                    </div>
                    <div
                        onClick={() => {
                            setChoice({
                                qlnv: false,
                                qlkh: false,
                                qlp: true,
                                qldv: false,
                                bctk: false,
                            });
                        }}
                        className={choice.qlp ? "ad-sidebar-choice" : ""}
                    >
                        Quản lý phòng
                    </div>
                    <div
                        onClick={() => {
                            setChoice({
                                qlnv: false,
                                qlkh: false,
                                qlp: false,
                                qldv: false,
                                bctk: true,
                            });
                        }}
                        className={choice.bctk ? "ad-sidebar-choice" : ""}
                    >
                        Báo cáo, thống kê
                    </div>
                </div>
                <div className="admin-content" id="admin-content">
                    {choice.qlp && <ManageRoom></ManageRoom>}
                    {choice.qlnv && <ManageEmployee></ManageEmployee>}
                    {choice.qldv && <ManageService></ManageService>}
                    {choice.qlkh && <ManageUser></ManageUser>}
                    {choice.bctk && <Report></Report>}
                </div>
            </div>
        </>
    );
};

export default Admin;
