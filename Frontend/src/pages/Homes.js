import React from "react";
import "./Home.css";
import Header from "../Header/Header";
import Posts from "../Features Room/Featureroom";
import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/topbar";
import { useState, useEffect } from "react";

export default function Homes() {
    return (
        <>
            <Header />
            <div className="home">
                <Posts />
                <Sidebar />
            </div>
        </>
    );
}
