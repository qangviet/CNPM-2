import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ChangePassword = () => {
    const [curPass, setCurPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const handleChangePassword = async () => {
        if (!curPass) {
            toast.error("Vui lòng nhập đầy đủ các trường!");
            return;
        }
        if (!newPass) {
            toast.error("Vui lòng nhập đầy đủ các trường!");
            return;
        }
        if (!confirmPass) {
            toast.error("Vui lòng nhập đầy đủ các trường!");
            return;
        }
        if (newPass !== confirmPass) {
            toast.error("Mật khẩu mới và mật khẩu nhập lại khác nhau!");
            return;
        }
        let acc = JSON.parse(sessionStorage.getItem("account"));
        let res = await axios.post("http://localhost:8088/api/change-password", {
            username: acc.username,
            curPass,
            newPass,
        });
        if (res.data.EC === "0") {
            toast.success(res.data.EM);
            setCurPass("");
            setNewPass("");
            setConfirmPass("");
        } else {
            toast.error(res.data.EM);
        }
    };

    return (
        <React.Fragment>
            <div className="ad-header-mngroom">
                <h3>Đổi mật khẩu</h3>
            </div>
            <div className="element-form">
                <label style={{ width: "200px" }}>Nhập mật khẩu hiện tại: </label>
                <input
                    type="password"
                    style={{ width: "200px" }}
                    value={curPass}
                    onChange={(e) => setCurPass(e.target.value)}
                ></input>
            </div>
            <div className="element-form">
                <label style={{ width: "200px" }}>Nhập mật khẩu mới: </label>
                <input
                    type="password"
                    style={{ width: "200px" }}
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                ></input>
            </div>
            <div className="element-form">
                <label style={{ width: "200px" }}>Nhập lại mật khẩu mới: </label>
                <input
                    type="password"
                    style={{ width: "200px" }}
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                ></input>
            </div>
            <div className="user-btn-container">
                <button className="btn-change-password" onClick={handleChangePassword}>
                    Đổi
                </button>
            </div>
        </React.Fragment>
    );
};

export default ChangePassword;
