import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { toast } from "react-toastify";

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

    const [history2, setHistory2] = useState();

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

        if (timeDifference < oneDay) {
            return 2; //Ngày hiện tại bé hơn hoặc bằng
        }
        if (timeDifference >= oneDay) {
            return 1; //Ngày hiện tại lớn hơn
        }
        return timeDifference >= oneDay;
    };

    useEffect(() => {
        const getHistoryReservation = async () => {
            await axios.get("http://localhost:8088/api/all-book-history").then((response) => {
                if (response.data.EC === "0") {
                    let data = [];
                    let data2 = [];
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
                            data2.push({
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
                                khInfo: {
                                    name: d.KH_NAME,
                                    phone: d.KH_SDT,
                                    address: d.KH_ADDRESS,
                                    cccd: d.KH_CCCD,
                                    gender: d.KH_GIOITINH,
                                },
                            });
                            continue;
                        }
                        if (compareTime(d.CheckInDate) === 2) {
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
                                cancel: true,
                                khInfo: {
                                    name: d.KH_NAME,
                                    phone: d.KH_SDT,
                                    address: d.KH_ADDRESS,
                                    cccd: d.KH_CCCD,
                                    gender: d.KH_GIOITINH,
                                },
                            });
                            continue;
                        }
                        if (compareTime(d.CheckOutDate) === 1) cancel = false;
                        data2.push({
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
                            khInfo: {
                                name: d.KH_NAME,
                                phone: d.KH_SDT,
                                address: d.KH_ADDRESS,
                                cccd: d.KH_CCCD,
                                gender: d.KH_GIOITINH,
                            },
                        });
                    }
                    setHistory(data);
                    setHistory2(data2.reverse());
                }
            });
        };
        getHistoryReservation();
    }, [effect]);

    const [modalCancel, setModalCancel] = useState(false);

    const [indexCancel, setIndexCancel] = useState(-1);

    const openModalCancel = (index) => {
        setIndexCancel(index);
        setModalCancel(true);
    };

    const closeModalCancel = () => {
        setIndexCancel(-1);
        setModalCancel(false);
    };

    const handleCancel = async () => {
        let res = await axios.post("http://localhost:8088/api/cancel-book", {
            rsID: history[indexCancel].rsid,
        });
        if (res.data.EC === "0") {
            toast.success(res.data.EM);
            setEffect((prev) => prev + 1);
            closeModalCancel();
        } else {
            toast.error(res.data.EM);
        }
    };

    const [detailsModal, setDetailsModal] = useState(false);

    const [userInfo, setUserInfo] = useState(null);

    const [roomInfo, setRoomInfo] = useState(null);
    const openDetailsModal = (index, pos) => {
        if (pos === 1) {
            let data = {
                name: history[index].khInfo.name,
                phone: history[index].khInfo.phone,
                address: history[index].khInfo.address,
                cccd: history[index].khInfo.cccd,
                gender: history[index].khInfo.gender,
            };
            let data2 = {
                id: history[index].rid,
                type: history[index].type,
                checkIn: history[index].checkIn,
                checkOut: history[index].checkOut,
                total: history[index].totalPrice,
            };
            setUserInfo(data);
            setRoomInfo(data2);
        } else {
            let data = {
                name: history2[index].khInfo.name,
                phone: history2[index].khInfo.phone,
                address: history2[index].khInfo.address,
                cccd: history2[index].khInfo.cccd,
                gender: history2[index].khInfo.gender,
            };
            let data2 = {
                id: history2[index].rid,
                type: history2[index].type,
                checkIn: history2[index].checkIn,
                checkOut: history2[index].checkOut,
                total: history2[index].totalPrice,
            };
            setUserInfo(data);
            setRoomInfo(data2);
        }
        setDetailsModal(true);
    };
    const closeDetailsModal = () => {
        setUserInfo(null);
        setRoomInfo(null);
        setDetailsModal(false);
    };

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
            {detailsModal && (
                <Modal
                    isOpen={detailsModal}
                    onRequestClose={closeDetailsModal}
                    style={customStyles}
                    contentLabel="Chi tiết"
                >
                    <div className="employee-container-modal">
                        <div className="modal-content left">
                            <h3>Thông tin khách hàng</h3>
                            <div className="employee-element-form">
                                <h4>Họ tên: </h4>
                                <p>{userInfo.name}</p>
                            </div>
                            <div className="employee-element-form">
                                <h4>Số điện thoại: </h4>
                                <p>{userInfo.phone}</p>
                            </div>
                            <div className="employee-element-form">
                                <h4>Địa chỉ: </h4>
                                <p>{userInfo.address}</p>
                            </div>
                            <div className="employee-element-form">
                                <h4>CCCD: </h4>
                                <p>{userInfo.cccd}</p>
                            </div>
                            <div className="employee-element-form">
                                <h4>Giới tính: </h4>
                                <p>{userInfo.gender}</p>
                            </div>
                        </div>
                        <div className="modal-content-divider"></div>
                        <div className="modal-content right">
                            <h3>Thông tin đặt phòng</h3>
                            <div className="employee-element-form">
                                <h4>Số phòng: </h4>
                                <p>{roomInfo.id}</p>
                            </div>
                            <div className="employee-element-form">
                                <h4>Loại phòng: </h4>
                                <p>{roomInfo.type}</p>
                            </div>
                            <div className="employee-element-form">
                                <h4>Check-in: </h4>
                                <p>{roomInfo.checkIn}</p>
                            </div>
                            <div className="employee-element-form">
                                <h4>Check-out: </h4>
                                <p>{roomInfo.checkOut}</p>
                            </div>
                            <div className="employee-element-form">
                                <h4>Tổng tiền: </h4>
                                <p>{roomInfo.total}</p>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
            <div className="ad-header-mngroom">
                <h3>Sắp tới</h3>
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
                                <tr
                                    key={index}
                                    onClick={() => openDetailsModal(index, 1)}
                                    className="tr-hover"
                                >
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
                                            onClick={h.cancel ? () => openModalCancel(index) : null}
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
            <div className="ad-header-mngroom">
                <h3>Đã xong</h3>
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
                    {history2 && (
                        <tbody>
                            {history2.map((h, index) => (
                                <tr
                                    key={index}
                                    onClick={() => openDetailsModal(index, 2)}
                                    className="tr-hover"
                                >
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
                                            onClick={h.cancel ? () => openModalCancel(index) : null}
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
