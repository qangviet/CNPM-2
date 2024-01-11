import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
const BookServiceHistory = () => {
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

        const checkCancel = (input) => {
            const today = new Date();
            const dateObj = new Date(input);
            const isAfter = dateObj.getTime() > today.getTime() + 1000 * 60 * 60 * 24; // 24 giờ = 1 ngày
            return isAfter;
        };

        const getHistory = async () => {
            let acc = JSON.parse(sessionStorage.getItem("account"));
            let res = await axios.post("http://localhost:8088/api/book-service/history", {
                khID: acc.token,
            });
            if (res.data.EC === "0") {
                let data = [];
                for (const c of res.data.DT) {
                    let status = [];
                    if (c.status === 1) {
                        status[0] = { color: "#14f714" };
                        status[1] = "Thành công";
                    } else if (c.status === -1) {
                        status[0] = { color: "red" };
                        status[1] = "Đã hủy";
                    }
                    let cancel = checkCancel(c.date);

                    if (c.status === -1) cancel = false;

                    data.push({
                        id: c.shID,
                        name: c.name,
                        quantity: c.quantity,
                        time: c.time,
                        date: convertDate(c.date),
                        totalPrice: c.totalPrice,
                        status,
                        cancel,
                    });
                }
                setHistory(data);
            }
        };
        getHistory();
    }, []);

    const customStyles = {
        content: {
            top: "35%",
            left: " 50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };

    const [modalCancel, setModalCancel] = useState(false);
    const [serviceCancel, setServiceCancel] = useState(-1);
    const openModalCancel = (index) => {
        setModalCancel(true);
        setServiceCancel(index);
    };
    const closeModalCancel = () => {
        setModalCancel(false);
    };
    const handleCancel = async () => {
        let res = await axios.post("http://localhost:8088/api/book-service/cancel", {
            id: history[serviceCancel].id,
        });
        if (res.data.EC === "0") {
            toast.success(res.data.EM);

            setHistory((prev) => {
                prev[serviceCancel].status[0] = { color: "red" };
                prev[serviceCancel].status[1] = "Đã hủy";
                prev[serviceCancel].cancel = false;
                return prev;
            });

            closeModalCancel();
        } else {
            toast.error(res.data.EM);
        }
    };
    return (
        <React.Fragment>
            <Modal
                isOpen={modalCancel}
                onRequestClose={closeModalCancel}
                style={customStyles}
                contentLabel="Hủy dịch vụ"
            >
                <h3>Xác nhận hủy dịch vụ</h3>
                <div className="element-form">
                    <button className="btn-create" onClick={handleCancel}>
                        Xác nhận
                    </button>
                    <button className="btn-close" onClick={closeModalCancel}>
                        Thoát
                    </button>
                </div>
            </Modal>
            <div className="ad-header-mngroom">
                <h3>Lịch sử đặt dịch vụ</h3>
            </div>
            <div className="ad-table-room">
                <table className="zui-table zui-table-horizontal zui-table-highlight">
                    <thead>
                        <tr>
                            <th>Tên dịch vụ</th>
                            <th>Số lượng</th>
                            <th>Thời gian sử dụng</th>
                            <th>Ngày sử dụng</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((h, index) => (
                            <tr key={index}>
                                <td>{h.name}</td>
                                <td>{h.quantity}</td>
                                <td>{h.time}</td>
                                <td>{h.date}</td>
                                <td>{h.totalPrice}</td>
                                <td style={h.status[0]}>{h.status[1]}</td>
                                <td>
                                    <div
                                        className={
                                            h.cancel ? "user-btn-red-undeline" : "user-btn-undefine"
                                        }
                                        onClick={h.cancel ? () => openModalCancel(index) : null}
                                    >
                                        Hủy
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
};

export default BookServiceHistory;
