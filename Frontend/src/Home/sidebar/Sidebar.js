import React from "react";
import "./sidebar.css";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">SERVICES</span>
                <img
                    className="sidebarImg"
                    src={`${process.env.PUBLIC_URL}/Images/Background/sidebarImg.jpg`}
                    alt=""
                />
                <p>
                    The fully equipped fitness center has a large exercise area with many Star Trac
                    cardiovascular machines, weight stations, and other amenities.
                </p>
            </div>

            <div className="sidebarItem">
                <span className="sidebarTitle">FACILITIES</span>
                <ul className="sidebarList">
                    <li className="sidebarListItem">Gym</li>
                    <li className="sidebarListItem">Poolside Bar</li>
                    <li className="sidebarListItem">Spa</li>
                    <li className="sidebarListItem">Swimming Pool</li>
                    <li className="sidebarListItem">Restaurant</li>
                    <li className="sidebarListItem">Laundry</li>
                </ul>
            </div>

            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
            </div>

            <div className="sidebarSocial">
                <i className="sidebarIcon fa-brands fa-facebook"></i>
                <i className="sidebarIcon fa-brands fa-twitter"></i>
                <i className="sidebarIcon fa-brands fa-pinterest"></i>
                <i className="sidebarIcon fa-brands fa-square-instagram"></i>
            </div>
        </div>
    );
}
