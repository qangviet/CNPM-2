// Header.js

import React from "react";
import "./header.css";

const Header = () => {
    return (
        <div>
            <div className="header">
                {/* Your existing header content */}
                <img
                    className="headerImg"
                    src={`${process.env.PUBLIC_URL}/Images/Background/header.jpg`}
                    alt=""
                />
                <div className="overlayText">
                    <span>Hotel Stay Smart</span>
                    <span>Welcome</span>
                </div>
            </div>
        </div>
    );
};

export default Header;
