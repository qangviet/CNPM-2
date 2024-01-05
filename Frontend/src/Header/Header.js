// Header.js

import React from "react";
import "./header.css";
import Promotion from "./Promotion"; // Import the Promotion component

const Header = () => {
    return (
        <div>
            <div className="header">
                {/* Your existing header content */}
                <img
                    className="headerImg"
                    src="https://th.bing.com/th/id/R.9ea8dea5aa7f9acf6f01172999b2009a?rik=aM5RvydZFo5UiQ&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fwp1846089.jpg&ehk=dXqZrmErYGxl9tVR75%2bUNA2H5eH3IeQW5DqXIFN9lVg%3d&risl=&pid=ImgRaw&r=0"
                    alt=""
                />
                <div className="overlayText">
                    <span>Hotel Stay Smart</span>
                    <span>Welcome</span>
                </div>
            </div>
            <Promotion /> {/* Render the Promotion component here */}
        </div>
    );
};

export default Header;
