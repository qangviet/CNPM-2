import React, { useEffect } from "react";
import "./ManageRoom.scss";
import Modal from "react-modal";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import FormData from "form-data";

const ManageRoom = () => {
    Modal.setAppElement("#admin-content");
    const [roomData, setRoomData] = useState([]);
    const [effect, setEffect] = useState(0);
    useEffect(() => {
        const getRoomData = async () => {
            await axios
                .get("http://localhost:8088/api/crud-room/read")
                .then((response) => {
                    if (response.data.EC === "-1") {
                        toast(response.data.EM);
                        return;
                    } else if (response.data.EC === "0") {
                        let rdata = [];
                        for (const r of response.data.DT) {
                            let status = [];
                            if (r.ROOM_LOCK === 1) {
                                status[0] = { color: "green" };
                                status[1] = "Mở";
                                status[2] = 1;
                            } else {
                                status[0] = { color: "red" };
                                status[1] = "Khóa";
                                status[2] = 0;
                            }
                            rdata.push({
                                id: r.ROOM_ID,
                                type: r.ROOM_TYPE,
                                price: r.ROOM_PRICE,
                                image: `${process.env.PUBLIC_URL}/Images/Rooms/${r.ROOM_ID}.jpg`,
                                desc: r.ROOM_DESC,
                                status,
                            });
                        }
                        setRoomData(rdata);
                        return;
                    }
                })
                .catch((error) => console.log(error));
        };
        getRoomData();
    }, [effect]);
    const [modalFormCreate, setModalFormCreate] = useState(false);

    const [ID, setID] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");
    const [image, setImage] = useState(null);

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

    const openFormCreate = () => {
        setModalFormCreate(true);
    };
    const closeFormCreate = () => {
        setID("");
        setPrice("");
        setType("");
        setDesc("");
        setImage(null);
        setModalFormCreate(false);
    };

    const handleCreateRoom = async (e) => {
        if (!ID) {
            toast.error("Vui lòng nhập ID!");
            return;
        }
        if (!type) {
            toast.error("Vui lòng nhập loại phòng!");
            return;
        }
        if (!price) {
            toast.error("Vui lòng nhập giá phòng!");
            return;
        }
        if (!desc) {
            toast.error("Vui lòng nhập thông tin chi tiết phòng!");
            return;
        }
        if (!image) {
            toast.error("Vui lòng chọn ảnh cho phòng!");
            return;
        }
        const data = new FormData();
        data.append("image", image);
        data.append("id", ID);
        let res1 = await axios.post("http:///localhost:8088/api/upload-image", data, {
            headers: {
                "Content-Type": "multipart/from-data",
            },
        });
        let res2 = await axios.post("http://localhost:8088/api/crud-room/create", {
            ID,
            type,
            price,
            desc,
        });
        if (res1.data.EC === "0" && res2.data.EC === "0") {
            // if (res2.data.EC === "0") {
            toast.success(res2.data.EM);
            setRoomData((prev) => [
                ...prev,
                {
                    id: ID,
                    type: type,
                    price: price,
                    image: `${process.env.PUBLIC_URL}/Images/Rooms/${ID}.jpg`,
                    desc: desc,
                },
            ]);
            closeFormCreate();
            return;
        } else {
            if (res1.data.EC !== "0") toast.error(res1.data.EM);
            if (res2.data.EC !== "0") toast.error(res2.data.EM);
        }
    };

    const [modalDelete, setModalDelete] = useState(false);
    const [roomDelete, setRoomDelete] = useState(-1);

    const openModalDelete = (index) => {
        setModalDelete(true);
        setRoomDelete(index);
    };
    const closeModalDelete = () => {
        setModalDelete(false);
        setRoomDelete(-1);
    };

    const handleDelete = async () => {
        let response = await axios.post(
            "http://localhost:8088/api/crud-room/delete",
            roomData[roomDelete]
        );
        if (response.data.EC === "0") {
            toast.success(response.data.EM);
            setRoomData((prev) => {
                prev.splice(roomDelete, 1);
                return prev;
            });
            closeModalDelete();
        } else {
            toast.error(response.data.EM);
            closeModalDelete();
        }
    };

    const [modalEdit, setModalEdit] = useState(false);
    const [roomEdit, setRoomEdit] = useState(-1);
    const openModalEdit = (index) => {
        setID(roomData[index].id);
        setPrice(roomData[index].price);
        setType(roomData[index].type);
        setDesc(roomData[index].desc);
        setImage(roomData[index].image);
        setRoomEdit(index);
        setModalEdit(true);
    };
    const closeModalEdit = () => {
        setID("");
        setPrice("");
        setType("");
        setDesc("");
        setImage(null);
        setRoomEdit(-1);
        setModalEdit(false);
    };

    const handleEdit = async () => {
        if (!type) {
            toast.error("Vui lòng nhập loại phòng!");
            return;
        }
        if (!price) {
            toast.error("Vui lòng nhập giá phòng!");
            return;
        }
        if (!desc) {
            toast.error("Vui lòng nhập thông tin chi tiết phòng!");
            return;
        }
        let response = await axios.post("http://localhost:8088/api/crud-room/update", {
            ID,
            type,
            price,
            desc,
        });
        if (image instanceof File) {
            const data = new FormData();
            data.append("image", image);
            data.append("id", ID);
            await axios.post("http:///localhost:8088/api/upload-image", data, {
                headers: {
                    "Content-Type": "multipart/from-data",
                },
            });
        }
        if (response.data.EC === "0") {
            toast.success(response.data.EM);
            setRoomData((prev) => {
                prev[roomEdit].type = type;
                prev[roomEdit].price = price;
                prev[roomEdit].desc = desc;
                return prev;
            });
            closeModalEdit();
        } else {
            toast.error(response.data.EM);
            closeModalEdit();
        }
    };

    const [modalLock, setModalLock] = useState(false);
    const [lock, setLock] = useState(0);
    const renderContent = () => {
        if (lock) {
            return (
                <>
                    <h3>Xác nhận khóa phòng</h3>
                    <p>Phòng sẽ không hiển thị để đặt phòng?</p>
                    <div className="element-form">
                        <button className="btn-create" onClick={() => handleLock(0)}>
                            Khóa
                        </button>
                        <button className="btn-close" onClick={closeModalLock}>
                            Hủy
                        </button>
                    </div>
                </>
            );
        } else
            return (
                <>
                    <h3>Xác nhận mở khóa phòng</h3>
                    <p>Phòng sẽ được đưa vào sử dụng?</p>
                    <div className="element-form">
                        <button className="btn-create" onClick={() => handleLock(1)}>
                            Mở khóa
                        </button>
                        <button className="btn-close" onClick={closeModalLock}>
                            Hủy
                        </button>
                    </div>
                </>
            );
    };

    const openModalLock = (index) => {
        setLock(roomData[index].status[2]);
        setID(roomData[index].id);
        setModalLock(true);
    };

    const closeModalLock = () => {
        setID("");
        setLock(-1);
        setModalLock(false);
    };

    const handleLock = async (lock) => {
        let res = await axios.post("http://localhost:8088/api/crud-room/lock", {
            id: ID,
            lock: lock,
        });
        if (res.data.EC === "0") {
            toast.success(res.data.EM);
            setEffect((prev) => prev + 1);
            closeModalLock();
        } else {
            toast.error(res.data.EM);
        }
    };

    return (
        <React.Fragment>
            <Modal
                isOpen={modalLock}
                onRequestClose={closeModalLock}
                style={customStyles}
                contentLabel="Xác nhận khóa phòng"
            >
                {renderContent()}
            </Modal>
            <Modal
                isOpen={modalFormCreate}
                onRequestClose={closeFormCreate}
                style={customStyles}
                contentLabel="Thêm phòng"
            >
                <h3>Thêm phòng</h3>
                <div className="element-form">
                    <label>ID: </label>
                    <input
                        type="number"
                        placeholder="ID"
                        value={ID}
                        onChange={(e) => {
                            if (e.target.value < 0) {
                                e.preventDefault();
                                return;
                            }
                            setID(e.target.value);
                        }}
                    ></input>
                </div>
                <div className="element-form">
                    <label>Loại phòng: </label>
                    <input
                        type="text"
                        placeholder="Loại phòng"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    ></input>
                </div>
                <div className="element-form">
                    <label>Giá ($): </label>
                    <input
                        type="number"
                        placeholder="Giá"
                        value={price}
                        onChange={(e) => {
                            if (e.target.value < 0) {
                                e.preventDefault();
                                return;
                            }
                            setPrice(e.target.value);
                        }}
                    ></input>
                </div>
                <div className="element-form">
                    <label>Thông tin chi tiết: </label>
                    <textarea
                        type=""
                        placeholder="Thông tin chi tiết"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
                </div>
                <div className="element-form">
                    <label>Ảnh </label>
                    <input
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={(e) => setImage(e.target.files[0])}
                    ></input>
                </div>
                <div className="element-form">
                    <button className="btn-create" onClick={handleCreateRoom}>
                        Thêm
                    </button>
                    <button className="btn-close" onClick={closeFormCreate}>
                        Hủy
                    </button>
                </div>
            </Modal>
            <Modal
                isOpen={modalDelete}
                onRequestClose={closeModalDelete}
                style={customStyles}
                contentLabel="Xóa phòng"
            >
                <h3>Xác nhận xóa phòng</h3>
                <p>Xóa tất cả các thông tin liên quan đến phòng này?</p>
                <div className="element-form">
                    <button className="btn-create" onClick={handleDelete}>
                        Xóa
                    </button>
                    <button className="btn-close" onClick={closeModalDelete}>
                        Hủy
                    </button>
                </div>
            </Modal>
            <Modal
                isOpen={modalEdit}
                onRequestClose={closeModalEdit}
                style={customStyles}
                contentLabel="Sửa phòng"
            >
                <h3>Chỉnh sửa thông tin phòng</h3>
                <div className="element-form">
                    <label>ID: </label>
                    <input
                        type="text"
                        placeholder="ID"
                        value={ID}
                        onChange={(e) => setID(e.target.value)}
                        disabled
                    ></input>
                </div>
                <div className="element-form">
                    <label>Loại phòng: </label>
                    <input
                        type="text"
                        placeholder="Loại phòng"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    ></input>
                </div>
                <div className="element-form">
                    <label>Giá ($): </label>
                    <input
                        type="number"
                        placeholder="Giá"
                        value={price}
                        onChange={(e) => {
                            if (e.target.value < 0) {
                                e.preventDefault();
                                return;
                            }
                            setPrice(e.target.value);
                        }}
                    ></input>
                </div>
                <div className="element-form">
                    <label>Thông tin chi tiết: </label>
                    <textarea
                        type=""
                        placeholder="Thông tin chi tiết"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
                </div>
                <div className="element-form">
                    <label>Ảnh </label>
                    <input
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={(e) => setImage(e.target.files[0])}
                    ></input>
                </div>
                <div className="element-form    ">
                    <button className="btn-create" onClick={handleEdit}>
                        Sửa
                    </button>
                    <button className="btn-close" onClick={closeModalEdit}>
                        Hủy
                    </button>
                </div>
            </Modal>
            <div className="ad-header-mngroom">
                <h3>Quản lý phòng</h3>
                <div className="ad-wrap-container">
                    <button className="btn-ad-create" onClick={() => openFormCreate()}>
                        <i class="fa fa-plus" aria-hidden="true" style={{ margin: "0px 5px" }}></i>
                        Thêm
                    </button>
                </div>
            </div>

            <div className="ad-table-room">
                <table className="zui-table zui-table-horizontal zui-table-highlight">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ảnh</th>
                            <th>Loại phòng</th>
                            <th>Giá ($)</th>
                            <th>Thông tin chi tiết</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roomData.map((room, index) => (
                            <tr key={room.id}>
                                <td>{room.id}</td>
                                <td>
                                    <img
                                        style={{ width: "108px", height: "81px" }}
                                        src={room.image}
                                        alt={room.id}
                                    ></img>
                                </td>
                                <td>{room.type}</td>
                                <td>{room.price}</td>
                                <td className="td-wraptext">{room.desc}</td>
                                <td style={room.status[0]}>{room.status[1]}</td>
                                <td>
                                    <button
                                        className="ad-btn-action"
                                        onClick={() => openModalEdit(index)}
                                    >
                                        <img
                                            alt=""
                                            src={`${process.env.PUBLIC_URL}/Images/Icon/pencil.png`}
                                            style={{
                                                width: "20px",
                                                height: "20px",
                                                backgroundColor: "none",
                                            }}
                                        ></img>
                                    </button>
                                    <button
                                        className="ad-btn-action"
                                        onClick={() => openModalDelete(index)}
                                    >
                                        <img
                                            alt=""
                                            src={`${process.env.PUBLIC_URL}/Images/Icon/bin.png`}
                                            style={{
                                                width: "20px",
                                                height: "20px",
                                                backgroundColor: "none",
                                            }}
                                        ></img>
                                    </button>
                                    <button
                                        className="ad-btn-action"
                                        onClick={() => openModalLock(index)}
                                    >
                                        <img
                                            alt=""
                                            src={`${process.env.PUBLIC_URL}/Images/Icon/padlock.png`}
                                            style={{
                                                width: "20px",
                                                height: "20px",
                                                backgroundColor: "none",
                                            }}
                                        ></img>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
};

export default ManageRoom;
