import React, { useEffect, useState } from "react";
import "./Feedback.scss"; // Import the CSS file
import Modal from "react-modal";
import Star from "./Star";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
};

const Feedback = () => {
    Modal.setAppElement("#root");

    const fb_styles = {
        container: {
            display: "flex",
            width: "600px",
            flexDirection: "column",
            alignItems: "center",
        },
        stars: {
            display: "flex",
            flexDirection: "row",
        },
        textarea: {
            border: "1px solid #a9a9a9",
            borderRadius: 5,
            padding: 10,
            margin: "20px 0",
            minHeight: "150px",
            fontSize: "14px",
            maxWidth: "500px",
            minWidth: "500px",
        },
        button: {
            border: "1px solid #a9a9a9",
            borderRadius: 5,
            width: 300,
            padding: 10,
        },
    };
    const [avgRate, setAvgRate] = useState(5);
    const [feedbackData, setFeebackData] = useState([]);
    const [feedbackRateData, setFeedbackRateData] = useState([]);

    const convertDate2 = (originalTime) => {
        let date = new Date(originalTime);
        let day = String(date.getDate()).padStart(2, "0");
        let month = String(date.getMonth() + 1).padStart(2, "0");
        let year = date.getFullYear();
        let hours = String(date.getHours()).padStart(2, "0");
        let minutes = String(date.getMinutes()).padStart(2, "0");
        // let secon/ds = String(date.getSeconds()).padStart(2, "0");
        return `${day}-${month}-${year} ${hours}:${minutes}`;
    };

    const getDateNow = () => {
        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0"); // Tháng trong JavaScript bắt đầu từ 0
        const day = String(now.getDate()).padStart(2, "0");

        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const [effect, setEffect] = useState(0);

    useEffect(() => {
        const getDataFeedBack = async () => {
            axios.get("http://localhost:8088/api/feedback/data").then((res) => {
                if (res.data.EC === "0") {
                    let data1 = [];
                    let data2 = [];
                    for (let i = 1; i !== 6; i++) {
                        data2.push({
                            count: 0,
                            ratePercent: 0,
                        });
                    }
                    for (const f of res.data.DT) {
                        data1.push({
                            name: f.KH_NAME,
                            time: convertDate2(f.FB_TIME),
                            rate: f.FB_RATING,
                            text: f.FB_TEXT,
                        });
                        data2[5 - f.FB_RATING].count += 1;
                    }
                    let sum = 0;
                    for (let i = 0; i < 5; i++) {
                        let f = data2[i];
                        f.ratePercent = Math.round((f.count / data1.length) * 100);
                        sum = sum + (5 - i) * f.count;
                    }
                    sum = Math.round((sum / data1.length) * 10) / 10;
                    setAvgRate(sum);
                    setFeebackData(data1);
                    setFeedbackRateData(data2);
                } else {
                    toast.error(res.data.EM);
                }
            });
        };
        getDataFeedBack();
    }, [effect]);

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

    const [modalWrite, setModalWrite] = useState(false);

    const [fbText, setFbText] = useState("");

    const openModalWrire = () => {
        if (!sessionStorage.getItem("account")) {
            toast.warning("Vui lòng đăng nhập! ");
        } else {
            setModalWrite(true);
        }
    };

    const [currentValue, setCurrentValue] = useState(5);
    const [hoverValue, setHoverValue] = useState(undefined);
    const stars = Array(5).fill(5);
    const closeModalWrite = () => {
        setFbText("");
        setCurrentValue(5);
        setModalWrite(false);
    };

    const handleClick = (value) => {
        setCurrentValue(value);
    };
    const handleMouseOver = (newHoverValue) => {
        setHoverValue(newHoverValue);
    };
    const handleMouseLeave = () => {
        setHoverValue(undefined);
    };

    const handleSubmit = async () => {
        let acc = JSON.parse(sessionStorage.getItem("account"));
        let respone = await axios.post("http://localhost:8088/api/feedback/create", {
            khID: acc.token,
            time: getDateNow(),
            text: fbText,
            rate: currentValue,
        });
        if (respone.data.EC === "0") {
            toast.success("Viết feedback thành công!");
            setEffect((prev) => prev + 1);
            closeModalWrite();
        } else {
            toast.error(respone.data.EM);
        }
    };

    return (
        <>
            <Modal
                isOpen={modalWrite}
                onRequestClose={closeModalWrite}
                style={customStyles}
                contentLabel="Viết Feedback"
            >
                <div style={fb_styles.container}>
                    <p>Đánh giá, bình luận về phòng và các dịch vụ của khách sạn</p>
                    <h2> Chọn đánh giá </h2>
                    <div style={fb_styles.stars}>
                        {stars.map((_, index) => {
                            return (
                                <FaStar
                                    key={index}
                                    size={24}
                                    onClick={() => handleClick(index + 1)}
                                    onMouseOver={() => handleMouseOver(index + 1)}
                                    onMouseLeave={handleMouseLeave}
                                    color={
                                        (hoverValue || currentValue) > index
                                            ? colors.orange
                                            : colors.grey
                                    }
                                    style={{
                                        marginRight: 10,
                                        cursor: "pointer",
                                    }}
                                />
                            );
                        })}
                    </div>
                    <textarea
                        placeholder="Đánh giá về phòng và dịch vụ"
                        style={fb_styles.textarea}
                        value={fbText}
                        onChange={(e) => setFbText(e.target.value)}
                    />

                    <button className="button-viewdetails" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </Modal>
            <div className="fb-container">
                <h1>FEEDBACK</h1>
                <h2>KHÁCH HÀNG NHẬN XÉT</h2>
                <div className="fb-rate-container">
                    <div className="avg-rate-container">
                        <p style={{ fontSize: "26px", fontWeight: "bold" }}>Đánh giá trung bình</p>
                        <p className="avg-rate">{avgRate} / 5</p>
                        <p style={{ color: "gray" }}>({feedbackData.length}) đánh giá</p>
                    </div>
                    <div className="fb-rate-star">
                        {feedbackRateData.map((f, index) => (
                            <div>
                                <p>{5 - index}</p>
                                <img
                                    src={`${process.env.PUBLIC_URL}/Images/Icon/star.png`}
                                    alt="star"
                                />
                                <div
                                    className="rate-slider"
                                    style={{
                                        backgroundImage: `linear-gradient(to right, green ${f.ratePercent}%, white ${f.ratePercent}%)`,
                                    }}
                                ></div>
                                <p>({f.ratePercent} %)</p>
                            </div>
                        ))}
                    </div>
                    <div className="avg-rate-container">
                        <p>Chia sẻ nhận xét của nhận</p>
                        <button className="btn-write-feedback" onClick={openModalWrire}>
                            Viết đánh giá của bạn
                        </button>
                    </div>
                </div>
                <div className="user-fb-container">
                    {feedbackData.map((fb, index) => (
                        <>
                            <div className="fb-divider"></div>
                            <div className="fb-user-info">
                                <img
                                    src={`${process.env.PUBLIC_URL}/Images/Employee/avatar.png`}
                                    width="36px"
                                    height="36px"
                                    alt="avatar"
                                />
                                <h4>{fb.name}</h4>
                                <Star numberStar={`${fb.rate}`} />
                            </div>
                            <p>{fb.text}</p>
                            <i>{fb.time}</i>
                            <br></br>
                        </>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Feedback;
