import axios from "axios";
import React, { useEffect, useState } from "react";

const BookRoomHistory = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const convertDate = (input) => {
            const date = new Date(input);
            let day = date.getDate().toString();
            let month = (date.getMonth() + 1).toString();
            const year = date.getFullYear();
            if (day.length < 2) {
                day = "0" + day;
            }
            if (month.length < 2) {
                month = "0" + month;
            }
            return `${day}-${month}-${year}`;
        };
        const convertDate2 = (originalTime) => {
            let date = new Date(originalTime);
            let day = String(date.getDate()).padStart(2, "0");
            let month = String(date.getMonth() + 1).padStart(2, "0");
            let year = date.getFullYear();
            let hours = String(date.getHours()).padStart(2, "0");
            let minutes = String(date.getMinutes()).padStart(2, "0");
            let seconds = String(date.getSeconds()).padStart(2, "0");
            return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;
        };

        const totalPrice = (checkIn, checkOut, price) => {
            const date1 = new Date(checkIn);
            const date2 = new Date(checkOut);
            const difference = date2 - date1;
            const daysDifference = difference / (24 * 60 * 60 * 1000);
            return (daysDifference * price).toString() + " $";
        };

        const getHistoryReservation = async (username) => {
            let response = await axios.post("http://localhost:8088/api/book-history", {
                username,
            });
            console.log(response);
            if (response.data.EC === "0") {
                let data = [];
                for (const d of response.data.DT) {
                    let status;
                    if (d.status === 1) {
                        status = ["Thành công", { color: "green" }];
                    } else if (d.status === 0) {
                        status = ["Chờ xử lý", { color: "#f5ea4d" }];
                    } else {
                        status = ["Không thành công", { color: "red" }];
                    }
                    data.push({
                        rid: d.rID,
                        type: d.type,
                        checkIn: convertDate(d.checkIn),
                        checkOut: convertDate(d.checkOut),
                        createAt: convertDate2(d.createAt),
                        totalPrice: totalPrice(d.checkIn, d.checkOut, d.price),
                        status: status,
                    });
                }
                setHistory(data);
            }
        };
        let acc = JSON.parse(sessionStorage.getItem("account"));
        getHistoryReservation(acc.username);
    }, []);

    return (
        <React.Fragment>
            <div className="ad-header-mngroom">
                <h3>Lịch sử đặt phòng</h3>
            </div>
            <div className="ad-table-room">
                <table className="zui-table zui-table-horizontal zui-table-highlight">
                    <thead>
                        <tr>
                            <th>Số phòng</th>
                            <th>Loại phòng</th>
                            <th>Ngày nhận phòng</th>
                            <th>Ngày trả phòng</th>
                            <th>Thời gian đặt</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((h, index) => (
                            <tr key={index}>
                                <td>{h.rid}</td>
                                <td>{h.type}</td>
                                <td>{h.checkIn}</td>
                                <td>{h.checkOut}</td>
                                <td>{h.createAt}</td>
                                <td>{h.totalPrice}</td>
                                <td style={h.status[1]}>{h.status[0]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
};

export default BookRoomHistory;
