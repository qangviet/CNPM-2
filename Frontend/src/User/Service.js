import React from "react";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const Service = () => {
    Modal.setAppElement("#root");
    const [serviceData, setServiceData] = useState([]);

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

    useEffect(() => {
        const getServiceData = async () => {
            await axios.get("http://localhost:8088/api/crud-service/read").then((response) => {
                if (response.data.EC === "0") {
                    let data = [];
                    for (const r of response.data.DT) {
                        data.push({
                            id: r.SERVICE_ID,
                            name: r.SERVICE_NAME,
                            price: r.SERVICE_PRICE,
                            desc: r.SERVICE_DESC,
                        });
                    }
                    setServiceData(data);
                }
            });
        };
        getServiceData();
    }, []);

    const [modalBook, setModalBook] = useState(false);

    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [dateArray, setDateArray] = useState([]);
    const [price, setPrice] = useState(0);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const openModalBook = async (index) => {
        const convertDate = (date) => {
            let dd = String(date.getDate() - 1).padStart(2, "0");
            let mm = String(date.getMonth() + 1).padStart(2, "0"); // Tháng trong JavaScript bắt đầu từ 0
            let yyyy = date.getFullYear();
            return `${dd}-${mm}-${yyyy}`;
        };
        const getDatesArray = (date1, date2) => {
            // Tạo đối tượng Date từ xâu ngày
            const startDate = new Date(date1);
            const endDate = new Date(date2);

            // Lấy ngày đầu tiên của khoảng
            const firstDay = new Date(
                startDate.getFullYear(),
                startDate.getMonth(),
                startDate.getDate()
            );

            // Lấy ngày cuối cùng của khoảng
            const lastDay = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

            // Tạo danh sách ngày
            const days = [];
            for (let day = firstDay; day <= lastDay; day.setDate(day.getDate() + 1)) {
                // Lấy ngày theo định dạng "dd-mm-yyyy"
                let d;
                let m;
                if (day.getDate() < 10) {
                    d = `0${day.getDate()}`;
                } else d = `${day.getDate()}`;
                if (day.getMonth() + 1 < 10) {
                    m = `0${day.getMonth() + 1}`;
                } else m = `${day.getMonth() + 1}`;
                let y = `${day.getFullYear()}`;
                // const str = `${day.getDay()}-${day.getMonth()-d}`
                days.push(d + "-" + m + "-" + y);
            }
            return days;
        };

        let acc = JSON.parse(sessionStorage.getItem("account"));
        let res = await axios.post("http://localhost:8088/api/book-service/check", {
            username: acc.username,
        });
        if (res.data.EC === "1") {
            toast.warning(res.data.EM);
        } else if (res.data.EC === "0") {
            setId(serviceData[index].id);
            setName(serviceData[index].name);
            setModalBook(true);
            setPrice(serviceData[index].price);
            console.log(res.data.DT);
            let dates = [];
            for (const r of res.data.DT) {
                let d = getDatesArray(r.CheckInDate, r.CheckOutDate);
                dates.push(...d);
            }
            setDateArray(dates);
        } else {
            toast.error(res.data.EM);
        }
    };
    const closeModalBook = () => {
        setName("");
        setTime("");
        setId(0);
        setQuantity(0);
        setPrice(0);
        setDateArray([]);
        setModalBook(false);
    };

    const handleBookService = async () => {
        if (quantity === 0) {
            toast.error("Vui lòng chọn số lượng lớn hơn hoặc bằng 1!");
            return;
        }
        if (!time) {
            toast.error("Vui lòng chọn thời gian!");
            return;
        }
        if (!date) {
            toast.error("Vui lòng chọn ngày!");
            return;
        }
        let acc = JSON.parse(sessionStorage.getItem("account"));
        let res1 = await axios.post("http://localhost:8088/api/book-service/book", {
            id,
            quantity,
            time,
            date,
            khID: acc.token,
            totalPrice: price * quantity,
        });
        let res2 = await axios.post("http://localhost:8088/api/payment/create-bill-service", {
            shID: res1.data.DT.shID,
            khID: acc.token,
            total: price * quantity,
        });
        if (res1.data.EC === "0" && res2.data.EC === "0") {
            toast.success(res1.data.EM);
            closeModalBook();
        } else if (res1.data.EC !== "0") {
            toast.error(res1.data.EM);
        } else {
            toast.error(res2.data.EM);
        }
    };

    return (
        <React.Fragment>
            <Modal
                isOpen={modalBook}
                onRequestClose={closeModalBook}
                style={customStyles}
                contentLabel="Đặt dịch vụ"
            >
                <h3>Đặt dịch vụ</h3>
                <div className="element-form">
                    <label>Tên dịch vụ: </label>
                    <input
                        type="text"
                        placeholder="Tên"
                        value={name}
                        disabled
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                </div>
                <div className="element-form">
                    <label>Số lượng: </label>
                    <input
                        type="number"
                        placeholder="Số lượng"
                        value={quantity}
                        min="0"
                        onChange={(e) => {
                            if (e.target.value < 0) {
                                e.preventDefault();
                                return;
                            }
                            setQuantity(e.target.value);
                        }}
                    ></input>
                </div>
                <div className="element-form">
                    <label>Thời gian: </label>
                    <input
                        type="time"
                        value={time}
                        step="900"
                        onChange={(e) => setTime(e.target.value)}
                        style={{ width: "200px" }}
                    ></input>
                </div>
                <div className="element-form">
                    <label>Ngày: </label>
                    <select
                        options={dateArray}
                        onChange={(e) => setDate(e.target.value)}
                        style={{ width: "200px", fontSize: "14px" }}
                    >
                        <option value="">Chọn ngày</option>
                        {dateArray.map((d) => (
                            <option key={d} value={d}>
                                {d}{" "}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="emloyee-container-btn">
                    <button className="employee-btn-confirm" onClick={handleBookService}>
                        Đặt
                    </button>
                    <button className="employee-btn-decline" onClick={closeModalBook}>
                        Hủy
                    </button>
                </div>
            </Modal>
            <div className="ad-header-mngroom">
                <h3>Danh sách các dịch vụ</h3>
            </div>
            <div className="ad-table-room">
                <table className="zui-table zui-table-horizontal zui-table-highlight">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên dịch vụ</th>
                            <th>Giá ($)</th>
                            <th>Thông tin chi tiết</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {serviceData.map((s, index) => (
                            <tr key={s.id}>
                                <td>{s.id}</td>
                                <td>{s.name}</td>
                                <td>{s.price}</td>
                                <td className="td-wraptext">
                                    {s.desc.split("\n").map((item, index) => (
                                        <p key={index}> {item}</p>
                                    ))}
                                </td>
                                <td>
                                    <div
                                        className="employ-viewdetails"
                                        onClick={() => openModalBook(index)}
                                    >
                                        Đặt dịch vụ
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

export default Service;
