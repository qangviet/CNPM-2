import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { toast } from "react-toastify";

const BookServiceHistory = () => {
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

    const [history1, setHistory1] = useState(null);

    const [history2, setHistory2] = useState(null);

    const [history3, setHistory3] = useState(null);

    const [effect, setEffect] = useState(0);

    const convertDate = (originalTime) => {
        let date = new Date(originalTime);
        let day = String(date.getDate()).padStart(2, "0");
        let month = String(date.getMonth() + 1).padStart(2, "0");
        let year = date.getFullYear();
        // let hours = String(date.getHours()).padStart(2, "0");
        // let minutes = String(date.getMinutes()).padStart(2, "0");
        // let seconds = String(date.getSeconds()).padStart(2, "0");
        return `${day}-${month}-${year}`;
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
        const getDataBookService = async () => {
            await axios.get("http://localhost:8088/api/all-book-service").then((res) => {
                if (res.data.EC === "0") {
                    let data1 = [];
                    let data2 = [];
                    let data3 = [];

                    for (const r of res.data.DT) {
                        let status;
                        if (r.STATUS === 1) {
                            status = ["Thành công", { color: "green" }];
                        } else {
                            status = ["Đã hủy", { color: "red" }];
                            data3.push({
                                name: r.SERVICE_NAME,
                                quantity: r.QUANTITY,
                                time: r.TIME,
                                date: convertDate(r.DATE),
                                total: r.TOTAL_PRICE,
                                khID: r.KH_ID,
                                status,
                                khInfo: {
                                    name: r.KH_NAME,
                                    phone: r.KH_SDT,
                                    address: r.KH_ADDRESS,
                                    cccd: r.KH_CCCD,
                                    gender: r.KH_GIOITINH,
                                },
                            });
                            continue;
                        }
                        if (compareTime(r.DATE) === 2) {
                            data1.push({
                                name: r.SERVICE_NAME,
                                quantity: r.QUANTITY,
                                time: r.TIME,
                                date: convertDate(r.DATE),
                                total: r.TOTAL_PRICE,
                                khID: r.KH_ID,
                                status,
                                khInfo: {
                                    name: r.KH_NAME,
                                    phone: r.KH_SDT,
                                    address: r.KH_ADDRESS,
                                    cccd: r.KH_CCCD,
                                    gender: r.KH_GIOITINH,
                                },
                            });
                            continue;
                        }
                        data2.push({
                            name: r.SERVICE_NAME,
                            quantity: r.QUANTITY,
                            time: r.TIME,
                            date: convertDate(r.DATE),
                            total: r.TOTAL_PRICE,
                            khID: r.KH_ID,
                            status,
                            khInfo: {
                                name: r.KH_NAME,
                                phone: r.KH_SDT,
                                address: r.KH_ADDRESS,
                                cccd: r.KH_CCCD,
                                gender: r.KH_GIOITINH,
                            },
                        });
                    }
                    setHistory1(data1);
                    setHistory2(data2);
                    setHistory3(data3);
                } else {
                    toast.error(res.data.EM);
                }
            });
        };
        getDataBookService();
    }, [effect]);

    const [detailsModal, setDetailsModal] = useState(false);

    const [userInfo, setUserInfo] = useState(null);

    const [serviceInfo, setServiceInfo] = useState(null);
    const openDetailsModal = (index, pos) => {
        let h = `history${pos}`;
        if (pos === 1) {
            let data1 = {
                name: history1[index].khInfo.name,
                phone: history1[index].khInfo.phone,
                address: history1[index].khInfo.address,
                cccd: history1[index].khInfo.cccd,
                gender: history1[index].khInfo.gender,
            };
            let data2 = {
                name: history1[index].name,
                quantity: history1[index].quantity,
                time: history1[index].time,
                date: history1[index].date,
                total: history1[index].total,
            };
            setUserInfo(data1);
            setServiceInfo(data2);
        } else if (pos === 2) {
            let data1 = {
                name: history2[index].khInfo.name,
                phone: history2[index].khInfo.phone,
                address: history2[index].khInfo.address,
                cccd: history2[index].khInfo.cccd,
                gender: history2[index].khInfo.gender,
            };
            let data2 = {
                name: history2[index].name,
                quantity: history2[index].quantity,
                time: history2[index].time,
                date: history2[index].date,
                total: history2[index].total,
            };
            setUserInfo(data1);
            setServiceInfo(data2);
        } else {
            let data1 = {
                name: history3[index].khInfo.name,
                phone: history3[index].khInfo.phone,
                address: history3[index].khInfo.address,
                cccd: history3[index].khInfo.cccd,
                gender: history3[index].khInfo.gender,
            };
            let data2 = {
                name: history3[index].name,
                quantity: history3[index].quantity,
                time: history3[index].time,
                date: history3[index].date,
                total: history3[index].total,
            };
            setUserInfo(data1);
            setServiceInfo(data2);
        }
        setDetailsModal(true);
    };
    const closeDetailsModal = () => {
        setUserInfo(null);
        setServiceInfo(null);
        setDetailsModal(false);
    };

    return (
        <>
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
                                <h4>Tên dịch vụ: </h4>
                                <p>{serviceInfo.name}</p>
                            </div>
                            <div className="employee-element-form">
                                <h4>Số lượng: </h4>
                                <p>{serviceInfo.quantity}</p>
                            </div>
                            <div className="employee-element-form">
                                <h4>Ngày sử dụng: </h4>
                                <p>{serviceInfo.date}</p>
                            </div>
                            <div className="employee-element-form">
                                <h4>Thời gian: </h4>
                                <p>{serviceInfo.time}</p>
                            </div>
                            <div className="employee-element-form">
                                <h4>Tổng tiền: </h4>
                                <p>{serviceInfo.total}</p>
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
                            <th>Tên dịch vụ</th>
                            <th>Số lượng</th>
                            <th>Thời gian sử dụng</th>
                            <th>Ngày sử dụng</th>
                            <th>Tổng tiền</th>
                            <th>ID Khách hàng</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    {history1 && (
                        <tbody>
                            {history1.map((h, index) => (
                                <tr
                                    key={index}
                                    onClick={() => openDetailsModal(index, 1)}
                                    className="tr-hover"
                                >
                                    <td>{h.name}</td>
                                    <td>{h.quantity}</td>
                                    <td>{h.time}</td>
                                    <td>{h.date}</td>
                                    <td>{h.total}</td>
                                    <td>{h.khID}</td>
                                    <td style={h.status[1]}>{h.status[0]}</td>
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
                            <th>Tên dịch vụ</th>
                            <th>Số lượng</th>
                            <th>Thời gian sử dụng</th>
                            <th>Ngày sử dụng</th>
                            <th>Tổng tiền</th>
                            <th>ID Khách hàng</th>
                            <th>Trạng thái</th>
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
                                    <td>{h.name}</td>
                                    <td>{h.quantity}</td>
                                    <td>{h.time}</td>
                                    <td>{h.date}</td>
                                    <td>{h.total}</td>
                                    <td>{h.khID}</td>
                                    <td style={h.status[1]}>{h.status[0]}</td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
            <div className="ad-header-mngroom">
                <h3>Đã hủy</h3>
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
                            <th>ID Khách hàng</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    {history3 && (
                        <tbody>
                            {history3.map((h, index) => (
                                <tr
                                    key={index}
                                    onClick={() => openDetailsModal(index, 3)}
                                    className="tr-hover"
                                >
                                    <td>{h.name}</td>
                                    <td>{h.quantity}</td>
                                    <td>{h.time}</td>
                                    <td>{h.date}</td>
                                    <td>{h.total}</td>
                                    <td>{h.khID}</td>
                                    <td style={h.status[1]}>{h.status[0]}</td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </>
    );
};

export default BookServiceHistory;
