import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Topbar.scss";
const Topbar = () => {
    const navigate = useNavigate();
    const acc = JSON.parse(sessionStorage.getItem("account"));
    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/");
        window.location.reload();
    };
    return (
        <React.Fragment>
            <div className="ad-topbar-container">
                <h2>Hệ thống quản lý</h2>
                <img src={`${process.env.PUBLIC_URL}/Images/Admin/profile.png`} alt="Avatar" />
                <div className="ad-logout" onClick={handleLogout}>
                    Đăng xuất
                </div>
            </div>
            <h3 style={{ padding: "5px 20px" }}>{`Nhân viên: ${acc.name}`}</h3>
        </React.Fragment>
    );
};
export default Topbar;
