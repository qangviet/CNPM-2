import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./Profile.scss";
import Modal from "react-modal";
const PaymentHistory = () => {
    Modal.setAppElement("#employee-content");

    const [notPayRoom, setNotPayRoom] = useState([]);
    const [notPayService, setNotPayService] = useState([]);
    const [paidRoom, setPaidRoom] = useState([]);
    const [paidService, setPaidService] = useState([]);

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

    useEffect(() => {
        const getNotPayData = async () => {
            let acc = JSON.parse(sessionStorage.getItem("account"));
            let response = await axios.post("http://localhost:8088/api/payment/bill-data-by-id", {
                khID: acc.token,
            });
            if (response.data.EC === "0") {
                let data1 = [];
                let data2 = [];
                for (const r of response.data.DT.room) {
                    if (r.billStatus === 0) {
                        let status = [];
                        status[0] = { color: "#f7302d" };
                        status[1] = "Chưa thanh toán";
                        data1.push({
                            ...r,
                            status,
                            CheckInDate: convertDate(r.CheckInDate),
                            CheckOutDate: convertDate(r.CheckOutDate),
                        });
                    } else {
                        let status = [];
                        status[0] = { color: "#14f714" };
                        status[1] = "Đã thanh toán";
                        data2.push({
                            ...r,
                            status,
                            CheckInDate: convertDate(r.CheckInDate),
                            CheckOutDate: convertDate(r.CheckOutDate),
                        });
                    }
                }
                let data3 = [];
                let data4 = [];
                for (const r of response.data.DT.service) {
                    if (r.billStatus === 0) {
                        let status = [];
                        status[0] = { color: "#f7302d" };
                        status[1] = "Chưa thanh toán";
                        data3.push({
                            ...r,
                            status,
                            date: convertDate(r.date),
                        });
                    } else {
                        let status = [];
                        status[0] = { color: "#14f714" };
                        status[1] = "Đã thanh toán";
                        data4.push({
                            ...r,
                            status,
                            date: convertDate(r.date),
                        });
                    }
                }
                setNotPayRoom(data1);
                setNotPayService(data3);
                setPaidRoom(data2);
                setPaidService(data4);
            } else {
                toast.error(response.data.EM);
            }
        };
        getNotPayData();
    }, []);

    const [modalPayment, setModalPayment] = useState(false);

    const openModalPayment = () => {};

    return (
        <React.Fragment>
            <Modal></Modal>
            <div className="ad-header-mngroom">
                <h3>Chưa thanh toán</h3>
            </div>
            <div className="ad-header-mngroom">
                <h4>Phòng</h4>
            </div>
            <div className="ad-table-room">
                <table className="zui-table zui-table-horizontal zui-table-highlight">
                    <thead>
                        <tr>
                            <th>Số phòng</th>
                            <th>Loại phòng</th>
                            <th>Ngày nhận phòng</th>
                            <th>Ngày trả phòng</th>
                            <th>Đơn giá ($)</th>
                            <th>Tổng tiền ($)</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notPayRoom.map((r, index) => (
                            <tr key={index}>
                                <td>{r.rID}</td>
                                <td>{r.type}</td>
                                <td>{r.CheckInDate}</td>
                                <td>{r.CheckOutDate}</td>
                                <td>{r.price}</td>
                                <td>{r.totalPrice}</td>
                                <td style={r.status[0]}>{r.status[1]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="ad-header-mngroom">
                <h4>Dịch vụ</h4>
            </div>
            <div className="ad-table-room">
                <table className="zui-table zui-table-horizontal zui-table-highlight">
                    <thead>
                        <tr>
                            <th>Tên dịch vụ</th>
                            <th>Số lượng</th>
                            <th>Ngày sử dụng</th>
                            <th>Thời gian sử dụng</th>
                            <th>Đơn giá ($)</th>
                            <th>Tổng tiền ($)</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notPayService.map((r, index) => (
                            <tr key={index}>
                                <td>{r.name}</td>
                                <td>{r.quantity}</td>
                                <td>{r.date}</td>
                                <td>{r.time}</td>
                                <td>{r.price}</td>
                                <td>{r.totalPrice}</td>
                                <td style={r.status[0]}>{r.status[1]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="payment-container-btn">
                <button>Thanh toán tất cả</button>
            </div>
            <div className="ad-header-mngroom">
                <h3>Lịch sử thanh toán</h3>
            </div>
            <div className="ad-header-mngroom">
                <h4>Phòng</h4>
            </div>
            <div className="ad-table-room">
                <table className="zui-table zui-table-horizontal zui-table-highlight">
                    <thead>
                        <tr>
                            <th>Số phòng</th>
                            <th>Loại phòng</th>
                            <th>Ngày nhận phòng</th>
                            <th>Ngày trả phòng</th>
                            <th>Đơn giá ($)</th>
                            <th>Tổng tiền ($)</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paidRoom.map((r, index) => (
                            <tr key={index}>
                                <td>{r.rID}</td>
                                <td>{r.type}</td>
                                <td>{r.CheckInDate}</td>
                                <td>{r.CheckOutDate}</td>
                                <td>{r.price}</td>
                                <td>{r.totalPrice}</td>
                                <td style={r.status[0]}>{r.status[1]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="ad-header-mngroom">
                <h4>Dịch vụ</h4>
            </div>
            <div className="ad-table-room">
                <table className="zui-table zui-table-horizontal zui-table-highlight">
                    <thead>
                        <tr>
                            <th>Tên dịch vụ</th>
                            <th>Số lượng</th>
                            <th>Ngày sử dụng</th>
                            <th>Thời gian sử dụng</th>
                            <th>Đơn giá ($)</th>
                            <th>Tổng tiền ($)</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paidService.map((r, index) => (
                            <tr key={index}>
                                <td>{r.name}</td>
                                <td>{r.quantity}</td>
                                <td>{r.date}</td>
                                <td>{r.time}</td>
                                <td>{r.price}</td>
                                <td>{r.totalPrice}</td>
                                <td style={r.status[0]}>{r.status[1]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
};

export default PaymentHistory;
