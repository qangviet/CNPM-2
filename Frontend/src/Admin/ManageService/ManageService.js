import axios from "axios";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";

const ManageService = () => {
    Modal.setAppElement("#root");
    const [serviceData, setServiceData] = useState([]);

    const [effect, setEffect] = useState(0);

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
                        let status = [];
                        if (r.SERVICE_LOCK === 1) {
                            status[0] = { color: "green" };
                            status[1] = "Mở";
                            status[2] = 1;
                        } else {
                            status[0] = { color: "red" };
                            status[1] = "Khóa";
                            status[2] = 0;
                        }

                        data.push({
                            id: r.SERVICE_ID,
                            name: r.SERVICE_NAME,
                            price: r.SERVICE_PRICE,
                            desc: r.SERVICE_DESC,
                            status,
                        });
                    }
                    setServiceData(data);
                }
            });
        };
        getServiceData();
    }, [effect]);

    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");

    const [modalCreate, setModalCreate] = useState(false);

    const [modalDelete, setModalDelete] = useState(false);
    const [serviceDelete, setServiceDelete] = useState(-1);

    const [modalUpdate, setModalUpdate] = useState(false);
    const [serviceEdit, setServiceEdit] = useState(false);
    const openModalCreate = () => {
        setModalCreate(true);
    };

    const closeModalCreate = () => {
        setId(0);
        setName("");
        setPrice("");
        setDesc("");
        setModalCreate(false);
    };

    const handleCreate = async () => {
        if (!id) {
            toast.error("Vui lòng nhập ID!");
            return;
        }
        if (!name) {
            toast.error("Vui lòng nhập tên dịch vụ!");
            return;
        }
        if (!price) {
            toast.error("Vui lòng nhập giá dịch vụ!");
            return;
        }
        if (!desc) {
            toast.error("Vui lòng nhập thông tin chi tiết dịch vụ!");
            return;
        }
        let response = await axios.post("http://localhost:8088/api/crud-service/create", {
            id,
            name,
            price,
            desc,
        });
        if (response.data.EC === "0") {
            toast.success("Thêm mới dịch vụ thành công!");
            setEffect((prev) => prev + 1);
            closeModalCreate();
        } else {
            toast.error(response.data.EM);
        }
    };

    const openModalDelete = (index) => {
        setServiceDelete(index);
        setModalDelete(true);
    };

    const closeModalDelete = () => {
        setServiceDelete(-1);
        setModalDelete(false);
    };

    const handleDelete = async () => {
        console.log(serviceData);
        let response = await axios.post(
            "http://localhost:8088/api/crud-service/delete",
            serviceData[serviceDelete]
        );
        if (response.data.EC === "0") {
            toast.success(response.data.EM);
            setEffect((prev) => prev + 1);
            closeModalDelete();
        } else {
            toast.error(response.data.EM);
        }
    };
    const openModalUpdate = (index) => {
        setId(serviceData[index].id);
        setName(serviceData[index].name);
        setPrice(serviceData[index].price);
        setDesc(serviceData[index].desc);
        setServiceEdit(index);
        setModalUpdate(true);
    };
    const closeModalUpdate = () => {
        setId(0);
        setName("");
        setPrice("");
        setDesc("");
        setServiceEdit(-1);
        setModalUpdate(false);
    };
    const handleUpdate = async () => {
        let res = await axios.post("http://localhost:8088/api/crud-service/update", {
            id,
            name,
            price,
            desc,
        });
        if (res.data.EC === "0") {
            toast.success(res.data.EM);
            setEffect((prev) => prev + 1);
            closeModalUpdate();
        } else {
            toast.error(res.data.EM);
        }
    };

    const [modalLock, setModalLock] = useState(false);
    const [lock, setLock] = useState(0);

    const renderContent = () => {
        if (lock) {
            return (
                <>
                    <h3>Xác nhận khóa dịch vụ</h3>
                    <p>Dịch vụ sẽ không hiển thị để đặt dịch vụ?</p>
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
                    <h3>Xác nhận mở khóa dịch vụ</h3>
                    <p>Dịch vụ sẽ được đưa vào sử dụng?</p>
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
        setModalLock(true);
        setLock(serviceData[index].status[2]);
        setId(serviceData[index].id);
    };

    const closeModalLock = () => {
        setId(0);
        setLock(1);
        setModalLock(false);
    };

    const handleLock = async (lock) => {
        let res = await axios.post("http://localhost:8088/api/crud-service/lock", {
            id: id,
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
                contentLabel="Xác nhận khóa/mở khóa dịch vụ"
            >
                {renderContent()}
            </Modal>
            <Modal
                isOpen={modalCreate}
                onRequestClose={closeModalCreate}
                style={customStyles}
                contentLabel="Thêm dịch vụ"
            >
                <h3>Thêm dịch vụ</h3>
                <div className="element-form">
                    <label>ID: </label>
                    <input
                        type="number"
                        placeholder="ID"
                        value={id}
                        onChange={(e) => {
                            if (e.target.value < 0) {
                                e.preventDefault();
                                return;
                            }
                            setId(e.target.value);
                        }}
                    ></input>
                </div>
                <div className="element-form">
                    <label>Tên dịch vụ: </label>
                    <input
                        type="text"
                        placeholder="Tên dịch vụ"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                    <button className="btn-create" onClick={handleCreate}>
                        Thêm
                    </button>
                    <button className="btn-close" onClick={closeModalCreate}>
                        Hủy
                    </button>
                </div>
            </Modal>
            <Modal
                isOpen={modalDelete}
                onRequestClose={closeModalDelete}
                style={customStyles}
                contentLabel="Xóa dịch vụ"
            >
                <h3>Xác nhận xóa dịch vụ</h3>
                <p>Xóa tất cả các thông tin liên quan đến dịch vụ này?</p>
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
                isOpen={modalUpdate}
                onRequestClose={closeModalUpdate}
                style={customStyles}
                contentLabel="Sửa dịch vụ"
            >
                <h3>Sửa thông tin dịch vụ</h3>
                <div className="element-form">
                    <label>ID: </label>
                    <input
                        type="number"
                        placeholder="ID"
                        value={id}
                        disabled
                        onChange={(e) => {
                            if (e.target.value < 0) {
                                e.preventDefault();
                                return;
                            }
                            setId(e.target.value);
                        }}
                    ></input>
                </div>
                <div className="element-form">
                    <label>Tên dịch vụ: </label>
                    <input
                        type="text"
                        placeholder="Tên dịch vụ"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                    <button className="btn-create" onClick={handleUpdate}>
                        Sửa
                    </button>
                    <button className="btn-close" onClick={closeModalUpdate}>
                        Hủy
                    </button>
                </div>
            </Modal>
            <div className="ad-header-mngroom">
                <h3>Quản lý dịch vụ</h3>
                <div className="ad-wrap-container">
                    <button className="btn-ad-create" onClick={openModalCreate}>
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
                            <th>Tên dịch vụ</th>
                            <th>Giá ($)</th>
                            <th>Thông tin chi tiết</th>
                            <th>Trạng thái</th>
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
                                <td style={s.status[0]}>{s.status[1]}</td>
                                <td>
                                    <button
                                        className="ad-btn-action"
                                        onClick={() => openModalUpdate(index)}
                                    >
                                        <img
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

export default ManageService;
