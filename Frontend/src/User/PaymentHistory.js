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
                    if (r.billStatus === 0 || r.billStatus === 1) {
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
                    if (r.billStatus === 0 || r.billStatus === 1) {
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

    const customStyles = {
        content: {
            top: "50%",
            left: " 50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };

    const getToday = () => {
        let today = new Date();
        let date =
            today.getDate().toString().padStart(2, "0") +
            "-" +
            (today.getMonth() + 1).toString().padStart(2, "0") +
            "-" +
            today.getFullYear();
        return date;
    };

    const getDateTime = () => {
        // Tạo đối tượng Date với thời điểm hiện tại
        const now = new Date();

        // Lấy các thông tin cần thiết
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const second = now.getSeconds();

        // Trả về kết quả
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    };

    const [modalPayment, setModalPayment] = useState(false);
    const [totalRoom, setTotalRoom] = useState(0);
    const [totalService, setTotalService] = useState(0);
    const [name, setName] = useState("");
    const [billID, setBillID] = useState(0);
    const openModalPayment = () => {
        const calcTotal = () => {
            let room = 0;
            let service = 0;
            for (const r of notPayRoom) {
                room = room + r.totalPrice;
            }
            for (const s of notPayService) {
                service = service + s.totalPrice;
            }
            return [room, service];
        };
        let [r, s] = calcTotal();
        if (r > 0) {
            setBillID(notPayRoom[0].billID);
        } else if (s > 0) {
            setBillID(notPayService[0].billID);
        } else {
            toast.warning("Bạn không có hóa đơn để thanh toán !");
            return;
        }
        let acc = JSON.parse(sessionStorage.getItem("account"));
        setName(acc.name);
        setTotalRoom(r);
        setTotalService(s);
        setModalPayment(true);
    };

    const closeModalPayment = () => {
        setName("");
        setTotalRoom(0);
        setTotalService(0);
        setModalPayment(false);
    };

    const handlePay = async () => {
        let data = [];
        for (const r of notPayRoom) {
            data.push({
                billID: r.billID,
                billTime: getDateTime(),
            });
        }
        for (const s of notPayService) {
            data.push({
                billID: s.billID,
                billTime: getDateTime(),
            });
        }
        let response = await axios.post("http://localhost:8088/api/payment/user-pay", {
            id: billID,
            bill: data,
        });
        toast.success(response.data.EM);
        closeModalPayment();
    };

    return (
        <React.Fragment>
            <Modal
                isOpen={modalPayment}
                onRequestClose={closeModalPayment}
                style={customStyles}
                contentLabel="Thanh toán tất cả"
            >
                <div className="invoice-header-container">
                    <h1>HUST STAY SMART</h1>
                    <div>
                        <p>Invoice #: {billID} </p>
                        <p>Created: {getToday()}</p>
                        <p>Due: {getToday()}</p>
                    </div>
                </div>
                <div className="invoice-user-info">
                    <h3>{name}</h3>
                </div>
                <div className="invoice-box">
                    <table cellpadding="0" cellspacing="0">
                        <tr className="heading">
                            <td>Tên</td>
                            <td>Giá</td>
                        </tr>
                        <tr className="item">
                            <td>Phòng</td>
                            <td>{`$${totalRoom}.00`}</td>
                        </tr>
                        <tr className="item">
                            <td>Dịch vụ</td>
                            <td>{`$${totalService}.00`}</td>
                        </tr>
                        <tr className="total">
                            <td></td>
                            <td>Tổng tiền: ${totalRoom + totalService}.00</td>
                        </tr>
                    </table>
                </div>
                <div className="qrcode-container">
                    <h4>Quét mã QR bên dưới</h4>
                    <p>Vui lòng không thay đổi LỜI NHẮN chuyển khoản</p>
                    <img
                        style={{ width: "150px", height: "150px" }}
                        src={`${process.env.PUBLIC_URL}/Images/QR/QR_test.png`}
                        alt="QR Code"
                    />
                </div>
                <div className="btn-pay">
                    <button onClick={handlePay}>
                        <div class="svg-wrapper-1">
                            <div class="svg-wrapper">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                >
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path
                                        fill="currentColor"
                                        d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                        <span>Đã chuyển</span>
                    </button>
                </div>
            </Modal>
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
                <button onClick={openModalPayment}>Thanh toán tất cả</button>
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
