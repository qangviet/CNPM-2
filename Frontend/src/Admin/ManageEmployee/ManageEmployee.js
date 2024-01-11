import axios from "axios";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
const ManageEmployee = () => {
    Modal.setAppElement("#root");
    const [employData, setEmployData] = useState(null);
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
        const getData = async () => {
            await axios
                .get("http://localhost:8088/api/crud-employee/read")
                .then((response) => {
                    if (response.data.EC !== "0") {
                        toast.error(response.data.EM);
                        return;
                    } else {
                        let data = [];
                        for (const d of response.data.DT) {
                            data.push({
                                id: d.NV_ID,
                                name: d.NV_NAME,
                                phone: d.NV_SDT,
                                cccd: d.NV_CCCD,
                                address: d.NV_ADDRESS,
                                username: d.USER_NAME,
                                password: d.USER_PASS,
                            });
                        }
                        console.log(data);
                        setEmployData(data);
                        console.log("useEffect called");
                        return;
                    }
                })
                .catch((error) => console.log(error));
        };
        getData();
    }, [effect]);

    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [cccd, setCCCD] = useState("");
    const [address, setAddress] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [modalCreate, setModalCreate] = useState(false);

    const [indexDelete, setIndexDelete] = useState(-1);
    const [modalDelete, setModalDelete] = useState(false);

    const [modalUpdate, setModalUpdate] = useState(false);

    const openModalCreate = () => {
        setModalCreate(true);
    };

    const closeModalCreate = () => {
        setId(0);
        setName("");
        setPhone("");
        setCCCD("");
        setAddress("");
        setUsername("");
        setPassword("");
        setModalCreate(false);
    };

    const handleCreate = async () => {
        if (!id) {
            toast.error("Vui lòng nhập ID!");
            return;
        }
        if (!name) {
            toast.error("Vui lòng nhập tên!");
            return;
        }
        if (!phone) {
            toast.error("Vui lòng nhập số điện thoại!");
            return;
        }
        if (!cccd) {
            toast.error("Vui lòng nhập căn cước công dân!");
            return;
        }
        if (!address) {
            toast.error("Vui lòng nhập địa chỉ!");
            return;
        }
        if (!username) {
            toast.error("Vui lòng nhập username!");
            return;
        }
        if (!password) {
            toast.error("Vui lòng nhập password!");
            return;
        }
        let response = await axios.post("http://localhost:8088/api/crud-employee/create", {
            id,
            name,
            phone,
            cccd,
            address,
            username,
            password,
        });
        if (response.data.EC === "0") {
            toast.success("Thêm mới nhân viên thành công!");
            setEffect((prev) => prev + 1);
            closeModalCreate();
        } else {
            toast.error(response.data.EM);
        }
    };

    const openModalDelete = (index) => {
        setIndexDelete(index);
        setModalDelete(true);
    };

    const closeModalDelete = () => {
        setIndexDelete(-1);
        setModalDelete(false);
    };

    const handleDelete = async () => {
        let response = await axios.post("http://localhost:8088/api/crud-employee/delete", {
            id: employData[indexDelete].id,
            username: employData[indexDelete].username,
        });
        if (response.data.EC === "0") {
            toast.success(response.data.EM);
            setEffect((prev) => prev + 1);
            closeModalDelete();
        } else {
            toast.error(response.data.EM);
        }
    };
    const openModalUpdate = (index) => {
        setId(employData[index].id);
        setName(employData[index].name);
        setPhone(employData[index].phone);
        setCCCD(employData[index].cccd);
        setAddress(employData[index].address);
        setUsername(employData[index].username);
        setPassword(employData[index].password);
        setModalUpdate(true);
    };
    const closeModalUpdate = () => {
        setId(0);
        setName("");
        setPhone("");
        setCCCD("");
        setAddress("");
        setUsername("");
        setPassword("");
        setModalUpdate(false);
    };
    const handleUpdate = async () => {
        if (!id) {
            toast.error("Vui lòng nhập ID!");
            return;
        }
        if (!name) {
            toast.error("Vui lòng nhập tên!");
            return;
        }
        if (!phone) {
            toast.error("Vui lòng nhập số điện thoại!");
            return;
        }
        if (!cccd) {
            toast.error("Vui lòng nhập căn cước công dân!");
            return;
        }
        if (!address) {
            toast.error("Vui lòng nhập địa chỉ!");
            return;
        }
        if (!username) {
            toast.error("Vui lòng nhập username!");
            return;
        }
        if (!password) {
            toast.error("Vui lòng nhập password!");
            return;
        }
        let res = await axios.post("http://localhost:8088/api/crud-employee/update", {
            id,
            name,
            phone,
            cccd,
            address,
            username,
            password,
        });
        if (res.data.EC === "0") {
            toast.success(res.data.EM);
            setEffect((prev) => prev + 1);
            closeModalUpdate();
        } else {
            toast.error(res.data.EM);
        }
    };
    if (employData) {
        return (
            <React.Fragment>
                <Modal
                    isOpen={modalCreate}
                    onRequestClose={closeModalCreate}
                    style={customStyles}
                    contentLabel="Thêm nhân viên"
                >
                    <h3>Thêm nhân viên</h3>
                    <div className="element-form">
                        <label>ID: </label>
                        <input
                            type="number"
                            placeholder="ID"
                            value={id}
                            min="0"
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                if (inputValue < 0) {
                                    e.preventDefault();
                                    return;
                                }
                                setId(inputValue);
                            }}
                        ></input>
                    </div>
                    <div className="element-form">
                        <label>Tên nhân viên: </label>
                        <input
                            type="text"
                            placeholder="Tên nhân viên"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                    </div>
                    <div className="element-form">
                        <label>Số điện thoại: </label>
                        <input
                            type="text"
                            placeholder="SDT"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        ></input>
                    </div>
                    <div className="element-form">
                        <label>CCCD: </label>
                        <input
                            type="text"
                            placeholder="CCCD"
                            value={cccd}
                            onChange={(e) => setCCCD(e.target.value)}
                        ></input>
                    </div>
                    <div className="element-form">
                        <label>Địa chỉ: </label>
                        <input
                            type="text"
                            placeholder="Địa chỉ"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        ></input>
                    </div>
                    <div className="element-form">
                        <label>Username: </label>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        ></input>
                    </div>
                    <div className="element-form">
                        <label>Password: </label>
                        <input
                            type="text"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
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
                    contentLabel="Xóa nhân viên"
                >
                    <h3>Xác nhận xóa nhân viên</h3>
                    <p>Xóa tất cả các thông tin liên quan đến nhân viên này?</p>
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
                    contentLabel="Sửa nhân viên"
                >
                    <h3>Sửa thông tin nhân viên</h3>
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
                        <label>Tên nhân viên: </label>
                        <input
                            type="text"
                            placeholder="Tên nhân viên"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                    </div>
                    <div className="element-form">
                        <label>Số điện thoại: </label>
                        <input
                            type="text"
                            placeholder="Username"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        ></input>
                    </div>
                    <div className="element-form">
                        <label>CCCD: </label>
                        <input
                            type="text"
                            placeholder="CCCD"
                            value={cccd}
                            onChange={(e) => setCCCD(e.target.value)}
                        ></input>
                    </div>
                    <div className="element-form">
                        <label>Địa chỉ: </label>
                        <input
                            type="text"
                            placeholder="Địa chỉ"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        ></input>
                    </div>
                    <div className="element-form">
                        <label>Username: </label>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        ></input>
                    </div>
                    <div className="element-form">
                        <label>Password: </label>
                        <input
                            type="text"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
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
                    <h3>Quản lý nhân viên</h3>
                    <div className="ad-wrap-container">
                        <button className="btn-ad-create" onClick={openModalCreate}>
                            <i
                                class="fa fa-plus"
                                aria-hidden="true"
                                style={{ margin: "0px 5px" }}
                            ></i>
                            Thêm
                        </button>
                    </div>
                </div>
                <div className="ad-table-room">
                    <table className="zui-table zui-table-horizontal zui-table-highlight">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên</th>
                                <th>Số điện thoại</th>
                                <th>CCCD</th>
                                <th>Địa chỉ</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {employData.map((e, index) => (
                                <tr key={e.id}>
                                    <td>{e.id}</td>
                                    <td>{e.name}</td>
                                    <td>{e.phone}</td>
                                    <td>{e.cccd}</td>
                                    <td>{e.address}</td>
                                    <td>{e.username}</td>
                                    <td>{e.password}</td>
                                    <td>
                                        <button className="ad-btn-action">
                                            <img
                                                alt=""
                                                src={`${process.env.PUBLIC_URL}/Images/Icon/pencil.png`}
                                                style={{
                                                    width: "20px",
                                                    height: "20px",
                                                    backgroundColor: "none",
                                                }}
                                                onClick={() => openModalUpdate(index)}
                                            ></img>
                                        </button>
                                        <button className="ad-btn-action">
                                            <img
                                                alt=""
                                                src={`${process.env.PUBLIC_URL}/Images/Icon/bin.png`}
                                                style={{
                                                    width: "20px",
                                                    height: "20px",
                                                    backgroundColor: "none",
                                                }}
                                                onClick={() => openModalDelete(index)}
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
    }
};

export default ManageEmployee;
