import React, { useState } from "react";
import "./Room.scss"; // Import the CSS file
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

const Rooms = () => {
    const navigate = useNavigate();
    const [roomData, setRoomData] = useState([]);

    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");

    const [selectedRoom, setSelectedRoom] = useState(-1);

    const [totalPrice, setTotalPrice] = useState(0);

    const handleSearchRoom = async () => {
        const data1 = new Date(checkIn);
        const data2 = new Date(checkOut);
        if (data1.getTime() >= data2.getTime()) {
            toast.error("Ngày nhận phòng và trả phòng không hợp lệ !");
            return;
        }
        if (data1.getTime() < Date.now()) {
            toast.error("Ngày nhận phòng và trả phòng không hợp lệ !");
            return;
        }
        if (data2.getTime() < Date.now()) {
            toast.error("Ngày nhận phòng và trả phòng không hợp lệ !");
            return;
        }
        let response = await axios.post("http://localhost:8088/api/empty-room", {
            checkIn,
            checkOut,
        });
        if (response.data.EC === "0") {
            if (response.data.DT.length === 0) {
                toast.warning("Khách sạn đã hết phòng trong khoảng thời gian này !");
            } else {
                let rdata = [];
                for (const r of response.data.DT) {
                    rdata.push({
                        id: r.ROOM_ID,
                        type: r.ROOM_TYPE,
                        price: r.ROOM_PRICE,
                        image: `${process.env.PUBLIC_URL}/Images/Rooms/${r.ROOM_ID}.jpg`,
                        desc: r.ROOM_DESC,
                    });
                }
                setRoomData(rdata);
            }
        } else {
            toast.error(response.data.EM);
        }
    };

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

    const [modalDetails, setModalDetails] = useState(false);

    const openModalDetails = (index) => {
        setSelectedRoom(index);
        calculateTotalPrice(roomData[index].price);
        setModalDetails(true);
    };
    const cloesModalDetails = () => {
        setSelectedRoom(-1);
        setModalDetails(false);
    };
    const handleBookNow = async () => {
        if (!sessionStorage.getItem("account")) {
            alert("Hãy đăng nhập trước khi đặt phòng!");
            return;
        }
        if (checkIn && checkOut) {
            let username = JSON.parse(sessionStorage.getItem("account")).username;
            let respone = await axios.post("http://localhost:8088/api/book-room", {
                username: username,
                room_id: roomData[selectedRoom].id,
                checkIn: checkIn,
                checkOut: checkOut,
            });
            if (respone.data.EC === "0") {
                toast.success(respone.data.EM);
                navigate("/");
            } else {
                toast.error(respone.data.EM);
            }
        } else {
            alert("Vui lòng chọn Check in và Check out");
        }
    };

    const calculateTotalPrice = (price) => {
        if (checkIn && checkOut) {
            const startDate = new Date(checkIn);
            const endDate = new Date(checkOut);
            const timeDifference = endDate.getTime() - startDate.getTime();
            const duration = Math.ceil(timeDifference / (1000 * 3600 * 24));

            const totalPrice = duration * price;

            setTotalPrice(totalPrice);
        }
    };

    return (
        <div className="roompage-container">
            <div className="search-bar-container">
                <div className="search-bar">
                    <div>
                        <label>Ngày nhận phòng: </label>
                        <input
                            type="date"
                            className="date-input"
                            onChange={(e) => setCheckIn(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label>Ngày trả phòng: </label>
                        <input
                            type="date"
                            className="date-input"
                            onChange={(e) => setCheckOut(e.target.value)}
                        ></input>
                    </div>
                    <div className="btn-search">
                        <img
                            className="search-icon"
                            alt="search_icon"
                            src={`${process.env.PUBLIC_URL}/Images/Icon/search.png`}
                            onClick={handleSearchRoom}
                        />
                    </div>
                </div>
            </div>
            <div className="room-container">
                {roomData.map((room, index) => (
                    <div className="room-card" key={room.id} id={`room-${room.id}`}>
                        <img src={room.image} alt={room.type} />
                        <h3> {`${room.id}. ${room.type}`}</h3>
                        <p className="price">{"$" + room.price.toString() + " per night"}</p>
                        <button
                            className="button-viewdetails"
                            onClick={() => openModalDetails(index)}
                        >
                            Xem chi tiết
                        </button>
                    </div>
                ))}
            </div>
            <Modal
                isOpen={modalDetails}
                onRequestClose={cloesModalDetails}
                style={customStyles}
                contentLabel="Xem chi tiết"
            >
                {modalDetails && (
                    <div className="room-details">
                        <h2> {`${roomData[selectedRoom].id}. ${roomData[selectedRoom].type}`}</h2>
                        <img
                            src={roomData[selectedRoom].image}
                            alt={roomData[selectedRoom].type}
                            className="small-image"
                        />
                        <div>
                            <h3>Thông tin chi tiết phòng</h3>
                            <p className="fixed-box-text">{roomData[selectedRoom].desc}</p>
                        </div>
                        <div style={{ color: "red", fontWeight: "bold", fontSize: "24px" }}>
                            Tổng tiền: {totalPrice} $
                        </div>
                        <div className="modal-buttons">
                            <button className="btn-book" onClick={handleBookNow}>
                                Book Now
                            </button>
                            <button className="btn-close" onClick={cloesModalDetails}>
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Rooms;
