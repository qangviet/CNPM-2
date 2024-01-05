import React from "react";
import { useNavigate } from "react-router-dom";
import "./Topbar.scss";
const Topbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/");
        window.location.reload();
    };
    return (
        <div className="ad-topbar-container">
            <h2>Hệ thống quản lý</h2>
            <img src={`${process.env.PUBLIC_URL}/Images/Admin/profile.png`} alt="Avatar" />
            <div className="ad-logout" onClick={handleLogout}>
                Đăng xuất
            </div>
        </div>
    );
};
export default Topbar;
