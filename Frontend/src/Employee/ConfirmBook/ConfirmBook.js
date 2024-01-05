import React, { useEffect, useState } from "react";
import "./ConfirmBook.scss";
import Modal from "react-modal";
import axios from "axios";
import { toast } from "react-toastify";

const ConfirmBook = () => {
    Modal.setAppElement("#employee-content");

    const [reservationData, setReservationData] = useState([]);

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

        const getReservationData = async () => {
            await axios
                .get("http://localhost:8088/api/book-data")
                .then((response) => {
                    if (response.data.EC === "-1") {
                        toast(response.data.EM);
                        return;
                    } else if (response.data.EC === "0") {
                        let rdata = [];
                        for (const r of response.data.DT) {
                            rdata.push({
                                id: r.bookId,
                                checkIn: convertDate(r.checkIn),
                                checkOut: convertDate(r.checkOut),
                                createAt: convertDate2(r.createAt),
                                room: r.roomInfo,
                                user: r.userInfo,
                                status: "Đang chờ xử lý",
                            });
                        }
                        setReservationData(rdata);
                        return;
                    }
                })
                .catch((error) => console.log(error));
        };
        getReservationData();
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
    const [modalViewDetails, setModalViewDetails] = useState(false);

    const [userInfo, setUserInfo] = useState({});

    const [roomInfo, setRoomInfo] = useState({});

    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");

    const [bookSelected, setBookSelected] = useState(-1);

    const openViewDetails = (index) => {
        setBookSelected(index);
        setUserInfo(reservationData[index].user);
        setRoomInfo(reservationData[index].room);
        setCheckIn(reservationData[index].checkIn);
        setCheckOut(reservationData[index].checkOut);
        setModalViewDetails(true);
    };
    const closeViewDetails = () => {
        setBookSelected(0);
        setUserInfo({});
        setRoomInfo({});
        setCheckIn("");
        setCheckOut("");
        setModalViewDetails(false);
    };

    const handleConfirm = async () => {
        let response = await axios.post("http://localhost:8088/api/confirm-book", {
            id: reservationData[bookSelected].id,
            nv_id: "19726325",
        });
        if (response.data.EC === "0") {
            toast.success("Xác nhận thành công !");
            setReservationData((prev) => {
                prev.splice(bookSelected, 1);
                return prev;
            });
        } else {
            toast.error(response.data.EM);
        }
        closeViewDetails();
    };

    const handleDecline = async () => {
        let response = await axios.post("http://localhost:8088/api/decline-book", {
            id: reservationData[bookSelected].id,
            nv_id: "19726325",
        });
        if (response.data.EC === "0") {
            toast.success("Từ chối thành công !");
            setReservationData((prev) => {
                prev.splice(bookSelected, 1);
                return prev;
            });
        } else {
            toast.error(response.data.EM);
        }
        closeViewDetails();
    };

    return (
        <React.Fragment>
            <Modal
                isOpen={modalViewDetails}
                onRequestClose={closeViewDetails}
                style={customStyles}
                contentLabel="Xem chi tiết"
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
                            <p>{userInfo.CCCD}</p>
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
                            <p>{checkIn}</p>
                        </div>
                        <div className="employee-element-form">
                            <h4>Check-out: </h4>
                            <p>{checkOut}</p>
                        </div>
                        <div className="employee-element-form">
                            <h4>Giá phòng: </h4>
                            <p>{roomInfo.price}</p>
                        </div>
                    </div>
                </div>
                <div className="emloyee-container-btn">
                    <button className="employee-btn-confirm" onClick={handleConfirm}>
                        Xác nhận
                    </button>
                    <button className="employee-btn-decline" onClick={handleDecline}>
                        Từ chối
                    </button>
                </div>
            </Modal>
            <div className="ad-header-mngroom">
                <h3>Danh sách chờ xử lý</h3>
                <div className="ad-wrap-container">
                    <div className="search">
                        <input
                            type="text"
                            className="searchTerm"
                            placeholder="What are you looking for?"
                        />
                        <button type="submit" class="searchButton">
                            <i className="fa fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="ad-table-room">
                <table className="zui-table zui-table-horizontal zui-table-highlight">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Check in</th>
                            <th>Check out</th>
                            <th>Thời gian tạo</th>
                            <th>Trạng thái</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservationData.map((reservation, index) => (
                            <tr key={index}>
                                <td>{reservation.id}</td>
                                <td>{reservation.checkIn}</td>
                                <td>{reservation.checkOut}</td>
                                <td>{reservation.createAt}</td>
                                <td style={{ color: "#f1c40f" }}>{reservation.status}</td>
                                <td>
                                    <div
                                        className="employ-viewdetails"
                                        onClick={() => openViewDetails(index)}
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
};

export default ConfirmBook;
