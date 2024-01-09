import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";

const BookRoomHistory = () => {
    Modal.setAppElement("#root");

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

    const [history, setHistory] = useState();

    const [effect, setEffect] = useState();

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

    const compareTime = (input) => {
        const inputDate = new Date(input);
        inputDate.setHours(0, 0, 0, 0);

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const oneDay = 24 * 60 * 60 * 1000; // số milliseconds trong một ngày
        const timeDifference = currentDate - inputDate;

        return timeDifference >= oneDay;
    };

    useEffect(() => {
        const getHistoryReservation = async () => {
            await axios.get("http://localhost:8088/api/all-book-history").then((response) => {
                console.log(response);
                if (response.data.EC === "0") {
                    let data = [];
                    for (const d of response.data.DT) {
                        let status;
                        let cancel = true;
                        if (d.RESERVATION_STATUS === 1) {
                            status = ["Thành công", { color: "green" }];
                        } else if (d.RESERVATION_STATUS === 0) {
                            status = ["Chờ xử lý", { color: "#f5ea4d" }];
                        } else {
                            cancel = false;
                            status = ["Đã hủy", { color: "red" }];
                        }
                        if (compareTime(d.CheckOutDate)) cancel = false;
                        data.push({
                            rsid: d.RESERVATION_ID,
                            rid: d.ROOM_ID,
                            type: d.ROOM_TYPE,
                            khID: d.KH_ID,
                            checkIn: convertDate(d.CheckInDate),
                            checkOut: convertDate(d.CheckOutDate),
                            createAt: convertDate2(d.create_at),
                            totalPrice: totalPrice(d.CheckInDate, d.CheckOutDate, d.ROOM_PRICE),
                            status: status,
                            cancel,
                        });
                    }
                    setHistory(data);
                }
            });
        };
        getHistoryReservation();
    }, [effect]);

    const [modalCancel, setModalCancel] = useState(false);

    const openModalCancel = () => {
        setModalCancel(true);
    };

    const closeModalCancel = () => {
        setModalCancel(false);
    };

    const handleCancel = () => {};

    return (
        <>
            <Modal
                isOpen={modalCancel}
                onRequestClose={closeModalCancel}
                style={customStyles}
                contentLabel="Hủy đặt phòng"
            >
                <h3>Xác nhận hủy lịch đặt phòng</h3>
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
                            <th>ID Khách hàng</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    {history && (
                        <tbody>
                            {history.map((h, index) => (
                                <tr key={index}>
                                    <td>{h.rid}</td>
                                    <td>{h.type}</td>
                                    <td>{h.checkIn}</td>
                                    <td>{h.checkOut}</td>
                                    <td>{h.createAt}</td>
                                    <td>{h.totalPrice}</td>
                                    <td>{h.khID}</td>
                                    <td style={h.status[1]}>{h.status[0]}</td>
                                    <td>
                                        <div
                                            className={
                                                h.cancel
                                                    ? "user-btn-red-undeline"
                                                    : "user-btn-undefine"
                                            }
                                            onClick={h.cancel ? () => openModalCancel(index) : ""}
                                        >
                                            Hủy
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </>
    );
};

export default BookRoomHistory;
