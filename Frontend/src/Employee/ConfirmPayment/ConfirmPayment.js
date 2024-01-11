import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";

const ConfirmPayment = () => {
    Modal.setAppElement("#root");

    const [dataBill, setDataBill] = useState(null);
    const [effect, setEffect] = useState(0);

    useEffect(() => {
        const getDataBill = async () => {
            await axios
                .get("http://localhost:8088/api/payment/bill-data-employee")
                .then((response) => {
                    if (response.data.EC === "0") {
                        let d = response.data.DT;
                        setDataBill(d);
                        return;
                    } else {
                        toast.error(response.data.EM);
                        return;
                    }
                })
                .catch((error) => console.log(error));
        };
        getDataBill();
    }, [effect]);

    const getDateNow = () => {
        const now = new Date();

        // Lấy các thành phần của ngày và tháng
        const day = String(now.getDate()).padStart(2, "0");
        const month = String(now.getMonth() + 1).padStart(2, "0"); // January is 0!
        const year = now.getFullYear();

        // Lấy các thành phần của giờ, phút và giây
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");

        // Kết hợp lại và trả về dạng "hh:mm:ss dd-mm-yyyy"
        return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;
    };

    const convertDate = (input) => {
        const date = new Date(input);
        console.log(date);
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

    const convertDate2 = (input) => {
        let date = new Date(input);
        let day = String(date.getDate()).padStart(2, "0");
        let month = String(date.getMonth() + 1).padStart(2, "0");
        let year = date.getFullYear();
        let hours = String(date.getHours()).padStart(2, "0");
        let minutes = String(date.getMinutes()).padStart(2, "0");
        let seconds = String(date.getSeconds()).padStart(2, "0");
        return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;
    };

    const convertDate3 = (originalTime) => {
        let date = new Date(originalTime);
        let day = String(date.getDate()).padStart(2, "0");
        let month = String(date.getMonth() + 1).padStart(2, "0");
        let year = date.getFullYear();
        let hours = String(date.getHours()).padStart(2, "0");
        let minutes = String(date.getMinutes()).padStart(2, "0");
        let seconds = String(date.getSeconds()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const getDate1 = () => {
        return billTime.substring(8, 18);
    };

    const customStyles = {
        content: {
            top: "40%",
            left: " 50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };

    const [modalInvoice, setModalInvoice] = useState(false);
    const [indexBill, setIndexBill] = useState(-1);
    const [totalRoom, setTotalRoom] = useState(0);
    const [totalService, setTotalService] = useState(0);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [billID, setBillID] = useState(0);
    const [billTime, setBillTime] = useState("");
    const [isDisable, setIsDisable] = useState(false);
    const [payMethod, setPayMethod] = useState("");

    const openModalInvoice = async (type, index) => {
        if (type === "wait") {
            let data = dataBill.wait[index];
            setBillID(data.billID);
            let res = await axios.post("http://localhost:8088/api/payment/info-user", {
                id: data.khID,
            });
            if (res.data.EC === "0") {
                setName(res.data.DT.name);
                setPhone(res.data.DT.phone);
            }
            let total = 0;
            for (const r of data.room) {
                total += r.total;
                setBillTime(r.billTime);
            }
            setTotalRoom(total);
            total = 0;
            for (const s of data.service) {
                total += s.total;
                setBillTime(s.billTime);
            }
            setPayMethod("bank-tranfer");
            setTotalService(total);
            setIsDisable(true);
            setModalInvoice(true);
        } else {
            let data = dataBill.notPay[index];
            let res = await axios.post("http://localhost:8088/api/payment/info-user", {
                id: data.khID,
            });
            if (res.data.EC === "0") {
                setName(res.data.DT.name);
                setPhone(res.data.DT.phone);
            }
            let total1 = 0;
            for (const r of data.room) {
                total1 += r.total;
            }
            setTotalRoom(total1);
            let total2 = 0;
            for (const s of data.service) {
                total2 += s.total;
            }
            console.log("total1: ", total2);
            setTotalService(total2);
            if (total1 > 0) {
                setBillID(data.room[0].billID);
            } else if (total2 > 0) {
                setBillID(data.service[0].billID);
            }
            setPayMethod("");
            setBillTime(getDateNow());
            setIsDisable(false);
            setIndexBill(index);
            setModalInvoice(true);
        }
    };

    const closeModalInvoice = () => {
        setTotalRoom(0);
        setTotalService(0);
        setName("");
        setPhone("");
        setBillID(0);
        setIndexBill(-1);
        setBillTime("");
        setIsDisable(false);
        setPayMethod("");
        setModalInvoice(false);
    };

    const handleConfirmBill = async () => {
        let id = [];
        if (indexBill === -1) {
            id.push(billID);
        } else {
            for (const r of dataBill.notPay[indexBill].room) {
                id.push(r.billID);
            }
            for (const s of dataBill.notPay[indexBill].service) {
                id.push(s.billID);
            }
        }
        let res = await axios.post("http://localhost:8088/api/payment/confirm-bill", {
            type: payMethod,
            billID: billID,
            billTime: convertDate3(billTime),
            ids: id,
        });
        if (res.data.EC === "0") {
            toast.success(res.data.EM);
            setEffect((prev) => prev + 1);
            closeModalInvoice();
        }
    };
    const handleDeclineBill = async () => {
        if (indexBill === -1) {
            let res = await axios.post("http://localhost:8088/api/payment/cancel-bill", {
                billID: billID,
            });
            if (res.data.EC === "0") {
                toast.success(res.data.EM);
                setEffect((prev) => prev + 1);
            }
        }
        closeModalInvoice();
    };
    console.log(billTime);
    if (dataBill) {
        return (
            <React.Fragment>
                <Modal
                    isOpen={modalInvoice}
                    onRequestClose={closeModalInvoice}
                    style={customStyles}
                    contentLabel="Xem chi tiết"
                >
                    <div className="invoice-header-container">
                        <h1>HUST STAY SMART</h1>
                        <div>
                            <p>Invoice #: {billID} </p>
                            <p>Created: {getDate1()}</p>
                            <p>Due: {getDate1()}</p>
                        </div>
                    </div>
                    <div className="invoice-user-info">
                        <h3>{name}</h3>
                        <p style={{ marginLeft: "20px" }}>{phone}</p>
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
                    <div>
                        <div className="element-form">
                            <label style={{ width: "170px" }}>Hình thức thanh toán: </label>
                            <select
                                disabled={isDisable}
                                value={payMethod}
                                style={{ fontSize: "14px", padding: "3px" }}
                                onChange={(e) => setPayMethod(e.target.value)}
                            >
                                <option value="">Chọn</option>
                                <option value="bank-tranfer">Chuyển khoản</option>
                                <option value="cash">Tiền mặt</option>
                            </select>
                        </div>
                        <div className="element-form">
                            <label style={{ width: "170px" }}>Thời gian: </label>
                            <i style={{ padding: "9px", fontSize: "15px" }}>{billTime}</i>
                        </div>
                        <div className="emloyee-container-btn">
                            <button className="employee-btn-confirm" onClick={handleConfirmBill}>
                                Xác nhận
                            </button>
                            <button className="employee-btn-decline" onClick={handleDeclineBill}>
                                Từ chối
                            </button>
                        </div>
                    </div>
                </Modal>
                <div className="ad-header-mngroom">
                    <h3>Danh sách chưa thanh toán</h3>
                    <div className="ad-wrap-container"></div>
                </div>
                <div className="ad-table-room">
                    <table className="zui-table zui-table-horizontal zui-table-highlight">
                        <thead>
                            <tr>
                                <th>ID_ Khách</th>
                                <th>Thông tin</th>
                                <th>Trạng thái</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataBill.wait.map((d, i1) => (
                                <tr key={i1}>
                                    <td>{d.khID}</td>
                                    <td>
                                        <div className="ad-table-room">
                                            <h4>Phòng</h4>
                                            <table className="zui-table zui-table-horizontal zui-table-highlight">
                                                <thead>
                                                    <tr>
                                                        <th>Số phòng</th>
                                                        <th>Loại phòng</th>
                                                        <th>Ngày nhận phòng</th>
                                                        <th>Ngày trả phòng</th>
                                                        <th>Đơn giá ($)</th>
                                                        <th>Tổng tiền ($) </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {d.room.map((r, i2) => (
                                                        <tr key={i2}>
                                                            <td>{r.roomID}</td>
                                                            <td>{r.roomType}</td>
                                                            <td>{r.checkIn}</td>
                                                            <td>{r.checkOut}</td>
                                                            <td>{r.roomPrice}</td>
                                                            <td>{r.total}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="ad-table-room">
                                            <h4>Dịch vụ</h4>
                                            <table className="zui-table zui-table-horizontal zui-table-highlight">
                                                <thead>
                                                    <tr>
                                                        <th>Tên dịch vụ</th>
                                                        <th>Số lượng</th>
                                                        <th>Ngày sử dụng</th>
                                                        <th>Thời gian sử dụng</th>
                                                        <th>Đơn giá ($)</th>
                                                        <th>Tổng tiền ($) </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {d.service.map((s, i3) => (
                                                        <tr key={i3}>
                                                            <td>{s.sName}</td>
                                                            <td>{s.quantity}</td>
                                                            <td>{s.date}</td>
                                                            <td>{s.time}</td>
                                                            <td>{s.sPrice}</td>
                                                            <td>{s.total}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                    <td style={{ color: "#dce309" }}>Chờ xử lý</td>
                                    <td>
                                        <div
                                            className="employ-viewdetails"
                                            onClick={() => openModalInvoice("wait", i1)}
                                        >
                                            Chi tiết
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {dataBill.notPay.map((d, i1) => (
                                <tr key={i1}>
                                    <td>{d.khID}</td>
                                    <td>
                                        <div className="ad-table-room">
                                            <h4>Phòng</h4>
                                            <table className="zui-table zui-table-horizontal zui-table-highlight">
                                                <thead>
                                                    <tr>
                                                        <th>Số phòng</th>
                                                        <th>Loại phòng</th>
                                                        <th>Ngày nhận phòng</th>
                                                        <th>Ngày trả phòng</th>
                                                        <th>Đơn giá ($)</th>
                                                        <th>Tổng tiền ($) </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {d.room.map((r, i2) => (
                                                        <tr key={i2}>
                                                            <td>{r.roomID}</td>
                                                            <td>{r.roomType}</td>
                                                            <td>{convertDate(r.checkIn)}</td>
                                                            <td>{convertDate(r.checkOut)}</td>
                                                            <td>{r.roomPrice}</td>
                                                            <td>{r.total}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="ad-table-room">
                                            <h4>Dịch vụ</h4>
                                            <table className="zui-table zui-table-horizontal zui-table-highlight">
                                                <thead>
                                                    <tr>
                                                        <th>Tên dịch vụ</th>
                                                        <th>Số lượng</th>
                                                        <th>Ngày sử dụng</th>
                                                        <th>Thời gian sử dụng</th>
                                                        <th>Đơn giá ($)</th>
                                                        <th>Tổng tiền ($) </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {d.service.map((s, i3) => (
                                                        <tr key={i3}>
                                                            <td>{s.sName}</td>
                                                            <td>{s.quantity}</td>
                                                            <td>{convertDate(s.date)}</td>
                                                            <td>{s.time}</td>
                                                            <td>{s.sPrice}</td>
                                                            <td>{s.total}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                    <td style={{ color: "#d1160d" }}>Chưa thanh toán</td>
                                    <td>
                                        <div
                                            className="employ-viewdetails"
                                            onClick={() => openModalInvoice("not", i1)}
                                        >
                                            Chi tiết
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
};

export default ConfirmPayment;
