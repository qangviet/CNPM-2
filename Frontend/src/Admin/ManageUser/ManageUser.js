import axios from "axios";
import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
const ManageUser = () => {
    const [userData, setUserData] = useState([]);
    const [userSearch, setUserSearch] = useState([]);
    const [effect, setEffect] = useState(0);

    useEffect(() => {
        const getUserData = async () => {
            await axios.get("http://localhost:8088/api/user-data").then((res) => {
                if (res.data.EC === "0") {
                    let data = [];
                    for (const u of res.data.DT) {
                        let gender;
                        if (u.KH_GIOITINH === 0) gender = "Nam";
                        else gender = "Nữ";
                        data.push({
                            id: u.KH_ID,
                            name: u.KH_NAME,
                            phone: u.KH_SDT,
                            address: u.KH_ADDRESS,
                            cccd: u.KH_CCCD,
                            gender,
                        });
                    }
                    setUserData(data);
                    setUserSearch(data);
                } else {
                    toast.error(res.data.EM);
                }
            });
        };
        getUserData();
    }, [effect]);

    return (
        <>
            <div className="ad-header-mngroom">
                <h3>Quản lý nhân viên</h3>
                <div className="ad-wrap-container"></div>
            </div>
            <div className="ad-table-room">
                <table className="zui-table zui-table-horizontal zui-table-highlight">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên</th>
                            <th>Số điện thoại</th>
                            <th>CCCD</th>
                            <th>Địa chỉ</th>
                            <th>Giới tính</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userSearch.map((u, index) => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.phone}</td>
                                <td>{u.cccd}</td>
                                <td>{u.address}</td>
                                <td>{u.gender}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ManageUser;
