import React, { useEffect, useState } from "react";
import "./Report.scss";
import Chart from "./Chart";
import axios from "axios";
import { toast } from "react-toastify";
const Report = () => {
    const [data, setData] = useState([]);

    const [year, setYear] = useState(2023);

    useEffect(() => {
        const getRevenue = async () => {
            await axios.get("http://localhost:8088/api/report-revenue").then((res) => {
                if (res.data.EC === "0") {
                    let dt = [];
                    if (res.data.DT.countRoom === null) {
                        dt.push(0);
                    } else dt.push(res.data.DT.countRoom);
                    if (res.data.DT.countService === null) {
                        dt.push(0);
                    } else dt.push(res.data.DT.countService);
                    if (res.data.DT.rRevenue === null) {
                        dt.push(0);
                    } else dt.push(res.data.DT.rRevenue);
                    if (res.data.DT.svRevenue === null) {
                        dt.push(0);
                    } else dt.push(res.data.DT.svRevenue);
                    if (res.data.DT.allRevenue === null) {
                        dt.push(0);
                    } else dt.push(res.data.DT.allRevenue);
                    setData(dt);
                } else {
                    toast.error(res.data.EM);
                }
            });
        };
        getRevenue();
    }, []);

    return (
        <>
            <div className="ad-header-mngroom">
                <h3>Thống kê</h3>
                <div></div>
            </div>
            <div className="rp-container">
                <div className="report-count-container">
                    <div className="rp-element-count">
                        <div className="col-1">
                            <span>Tổng số phòng</span>
                            <div className="count-number">{data[0]}</div>
                        </div>
                        <div className="col-2">
                            <div className="divider"></div>
                        </div>
                    </div>
                    <div className="rp-element-count">
                        <div className="col-1">
                            <span>Tổng số dịch vụ</span>
                            <div className="count-number">{data[1]}</div>
                        </div>
                        <div className="col-2">
                            <div className="divider"></div>
                        </div>
                    </div>
                    <div className="rp-element-count">
                        <div className="col-1">
                            <span>Doanh thu phòng</span>
                            <div className="count-number">${data[2]}</div>
                        </div>
                        <div className="col-2">
                            <div className="divider"></div>
                        </div>
                    </div>
                    <div className="rp-element-count">
                        <div className="col-1">
                            <span>Doanh thu dịch vụ</span>
                            <div className="count-number">${data[3]}</div>
                        </div>
                        <div className="col-2">
                            <div className="divider"></div>
                        </div>
                    </div>
                    <div className="rp-element-count">
                        <div className="col-1">
                            <span>Tổng doanh thu</span>
                            <div className="count-number">${data[4]}</div>
                        </div>
                    </div>
                </div>
                <div className="rp-chart-container">
                    <div className="year-picker">
                        <select value={year} onChange={(e) => setYear(e.target.value)}>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                        </select>
                    </div>
                    <Chart year={year} />
                </div>
            </div>
        </>
    );
};

export default Report;
