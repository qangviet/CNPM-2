import React from "react";
import { Link } from "react-router-dom";
import "./topbar.css";
export default function TopbarGuest() {
    return (
        <div className="top">
            <div className="topLelt">
                <i className="topIcon fa-brands fa-facebook"></i>
                <i className="topIcon fa-brands fa-twitter"></i>
                <i className="topIcon fa-brands fa-pinterest"></i>
                <i className="topIcon fa-brands fa-square-instagram"></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    {/* Use Link components for navigation */}
                    <li className="topListItem">
                        <Link to="/">HOME</Link>
                    </li>
                    <li className="topListItem">
                        <Link to="/rooms">ROOMS</Link>
                    </li>
                    <li className="topListItem">
                        <Link to="/feedback">FEEDBACK</Link>
                    </li>
                    <li className="topListItem">
                        <Link to="/login">Login</Link>
                    </li>
                    <li className="topListItem">
                        <Link to="/register">Register</Link>
                    </li>
                </ul>
            </div>
            <div></div>
        </div>
    );
}
