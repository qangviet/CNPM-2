import React from "react";
import { Link } from "react-router-dom";
import "./topbar.css";
import { useNavigate } from "react-router-dom";
export default function TopbarUser(props) {
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/");
        window.location.reload();
    };
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
                        <Link to="/profile">{props.KH_name}</Link>
                    </li>
                    <li className="topListItem">
                        <Link onClick={handleLogout}>Log out</Link>
                    </li>
                </ul>
            </div>
            <div></div>
        </div>
    );
}
