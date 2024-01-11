import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./Profile.scss";
const Profile = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [CCCD, setCCCD] = useState("");
    const [gender, setGender] = useState("");

    useEffect(() => {
        const getInfo = async (username) => {
            let respone = await axios.post("http://localhost:8088/api/user-info", { username });
            if (respone.data.EC === "0") {
                setName(respone.data.DT["KH_NAME"]);
                setPhone(respone.data.DT["KH_SDT"]);
                setAddress(respone.data.DT["KH_ADDRESS"]);
                setCCCD(respone.data.DT["KH_CCCD"]);
                if (respone.data.DT["KH_GIOITINH"] === 0) {
                    setGender("0");
                } else if (respone.data.DT["KH_GIOITINH"] === 1) {
                    setGender("1");
                } else {
                    setGender("");
                }
            } else {
                toast.error(respone.data.EM);
            }
        };
        const acc = JSON.parse(sessionStorage.getItem("account"));
        getInfo(acc.username);
    }, []);

    const handleEditProfile = async () => {
        const acc = JSON.parse(sessionStorage.getItem("account"));

        if (!name) {
            toast.error("Vui lòng nhập họ tên !");
            return;
        }
        if (!phone) {
            toast.error("Vui lòng nhập số điện thoại !");
            return;
        }
        if (phone) {
            const regexCheck = /^(\d{4}\s\d{3}\s\d{3}|\d{10}|\d{3}\s\d{3}\s\d{4})$/;
            if (!regexCheck.test(phone)) {
                toast.error("Số điện thoại không hợp lệ !");
                return;
            }
        }
        if (!address) {
            toast.error("Vui lòng nhập địa chỉ !");
            return;
        }
        if (!CCCD) {
            toast.error("Vui lòng nhập căn cước công dân !");
            return;
        }
        if (CCCD) {
            const regexCheck = /^\d{12}$/;
            if (!regexCheck.test(CCCD)) {
                toast.error("CCCD không hợp lệ");
                return;
            }
        }
        if (!gender) {
            toast.error("Vui lòng chọn giới tính !");
            return;
        }
        let response = await axios.post("http://localhost:8088/api/edit-profile", {
            name,
            phone,
            address,
            CCCD,
            gender,
            username: acc.username,
        });
        console.log(response);
        if (response.data.EC === "0") {
            toast.success(response.data.EM);
        } else {
            toast.error(response.data.EM);
        }
    };

    return (
        <React.Fragment>
            <div className="ad-header-mngroom">
                <h3>Thông tin cá nhân</h3>
            </div>
            <br />
            <div className="element-form">
                <label>Họ tên: </label>
                <input value={name} onChange={(e) => setName(e.target.value)}></input>
            </div>
            <div className="element-form">
                <label>Số điện thoại: </label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)}></input>
            </div>
            <div className="element-form">
                <label>Địa chỉ: </label>
                <input value={address} onChange={(e) => setAddress(e.target.value)}></input>
            </div>
            <div className="element-form">
                <label>CCCD: </label>
                <input value={CCCD} onChange={(e) => setCCCD(e.target.value)}></input>
            </div>
            <div className="element-form">
                <label>Giới tính </label>
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="">Chọn một lựa chọn</option>
                    <option value="0">Nam</option>
                    <option value="1">Nữ</option>
                    <option value="-1">Khác</option>
                </select>
            </div>
            <div>
                <button className="btn-blue" onClick={handleEditProfile}>
                    Chỉnh sửa
                </button>
            </div>
        </React.Fragment>
    );
};

export default Profile;
