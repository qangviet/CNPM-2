import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { toast } from "react-toastify";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = (pros) => {
    const [dataChart1, setDataChart1] = useState(null);
    const [dataChart2, setDataChart2] = useState(null);

    const [dataChart3, setDataChart3] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const labels = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ];
            let res1 = await axios.post("http://localhost:8088/api/report-room", {
                year: pros.year,
            });
            let res2 = await axios.post("http://localhost:8088/api/report-service", {
                year: pros.year,
            });
            let res3 = await axios.post("http://localhost:8088/api/report-all", {
                year: pros.year,
            });
            if (res1.data.EC === "0" && res2.data.EC === "0" && res3.data.EC === "0") {
                let data1 = new Array(12).fill(0);
                let data2 = new Array(12).fill(0);
                let data3 = new Array(12).fill(0);
                let data4 = new Array(12).fill(0);
                let data5 = new Array(12).fill(0);
                for (let i = 0; i < res1.data.DT.book.length; i = i + 1) {
                    data1[res1.data.DT.book[i].Month - 1] = res1.data.DT.book[i].COUNT;
                }
                for (let i = 0; i < res1.data.DT.income.length; i = i + 1) {
                    data2[res1.data.DT.income[i].Month - 1] = parseInt(
                        res1.data.DT.income[i].INCOME
                    );
                }
                for (let i = 0; i < res2.data.DT.book.length; i = i + 1) {
                    data3[res2.data.DT.book[i].Month - 1] = res2.data.DT.book[i].COUNT;
                }
                for (let i = 0; i < res2.data.DT.income.length; i = i + 1) {
                    data4[res2.data.DT.income[i].Month - 1] = parseInt(
                        res2.data.DT.income[i].INCOME
                    );
                }
                for (let i = 0; i < res3.data.DT.length; i = i + 1) {
                    data5[res3.data.DT[i].Month - 1] = parseInt(res3.data.DT[i].INCOME);
                }
                setDataChart1({
                    labels,
                    datasets: [
                        {
                            label: "Phòng",
                            data: data1,
                            borderColor: "red",
                            backgroundColor: "red",
                        },
                        {
                            label: "Dịch vụ",
                            data: data3,
                            borderColor: "green",
                            backgroundColor: "green",
                        },
                    ],
                });
                setDataChart2({
                    labels,
                    datasets: [
                        {
                            label: "Phòng",
                            data: data2,
                            borderColor: "red",
                            backgroundColor: "red",
                        },
                        {
                            label: "Dịch vụ",
                            data: data4,
                            borderColor: "green",
                            backgroundColor: "green",
                        },
                    ],
                });
                setDataChart3({
                    labels,
                    datasets: [
                        {
                            label: "Doanh thu",
                            data: data5,
                            borderColor: "blue",
                            backgroundColor: "blue",
                        },
                    ],
                });
            } else {
                toast.error("database is error");
            }
        };
        getData();
    }, [pros.year]);
    const options1 = {
        responsive: true,
        plugins: {
            legend: {
                position: "right",
            },
            title: {
                display: true,
                text: "Thống kê số lượng phòng và dịch vụ được đặt theo tháng",
            },
        },
    };
    const options2 = {
        responsive: true,
        plugins: {
            legend: {
                position: "right",
            },
            title: {
                display: true,
                text: "Thống kê doanh thu phòng và dịch vụ được đặt theo tháng",
            },
        },
    };
    const options3 = {
        responsive: true,
        plugins: {
            legend: {
                position: "right",
            },
            title: {
                display: true,
                text: "Tổng doanh thu từng tháng",
            },
        },
    };
    return (
        <>
            <div className="row-1">
                <div className="chart-container">
                    {dataChart1 && <Line options={options1} data={dataChart1} />}
                </div>
                <div className="chart-container">
                    {dataChart2 && <Line options={options2} data={dataChart2} />}
                </div>
            </div>
            <div className="row-2">
                <div className="chart-container">
                    {dataChart3 && <Line options={options3} data={dataChart3} />}
                </div>
            </div>
        </>
    );
};
export default Chart;
