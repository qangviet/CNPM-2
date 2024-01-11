import React, { useState, useEffect } from "react";

const Facility = () => {
    const [facilities, setFacilities] = useState([
        {
            name: "Room",
            img: `${process.env.PUBLIC_URL}/Images/Background/room.jpg`,
        },
        {
            name: "Gym",
            img: `${process.env.PUBLIC_URL}/Images/Background/gym.jpg`,
        },
        {
            name: "Restaurant",
            img: `${process.env.PUBLIC_URL}/Images/Background/restaurant.jpg`,
        },
        {
            name: "Swimming Pool",
            img: `${process.env.PUBLIC_URL}/Images/Background/pool.jpg`,
        },
        {
            name: "Foods and Drinks",
            img: `${process.env.PUBLIC_URL}/Images/Background/food.jpg`,
        },
        {
            name: "Grand Piano",
            img: `${process.env.PUBLIC_URL}/Images/Background/piano.jpeg`,
        },
        {
            name: "Spa",
            img: `${process.env.PUBLIC_URL}/Images/Background/spa.jpg`,
        },
        {
            name: "Sunset View",
            img: `${process.env.PUBLIC_URL}/Images/Background/sunset.jpg`,
        },
    ]);

    useEffect(() => {
        // Fetch data from your API endpoint
        // Update the state using setFacilities(data)
    }, []);

    const facilityContainer = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px", // Adjust the gap between cards
    };

    const facilityCard = {
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        overflow: "hidden",
        transition: "transform 0.3s ease-in-out",
    };

    const imgStyle = {
        width: "100%",
        height: "200px", // Adjust the image height as needed
        objectFit: "cover",
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
    };

    const facilityTitle = {
        padding: "12px",
        backgroundColor: "#f4f4f4", // Background color for the title section
        borderBottomLeftRadius: "8px",
        borderBottomRightRadius: "8px",
    };

    const handleHover = (index) => {
        const card = document.getElementById(`facility-${index}`);
        if (card) {
            card.style.transform = "scale(1.05)";
        }
    };

    const handleHoverOut = (index) => {
        const card = document.getElementById(`facility-${index}`);
        if (card) {
            card.style.transform = "scale(1)";
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <p>
                “Facilities” is a broad term that encompasses various utilities and areas designated
                to facilitate activities in a hotel. It includes amenities such as rooms,
                restaurants, swimming pools, gyms, and more, tailored to meet the needs of hotel
                guests and market segments.
            </p>
            <div style={facilityContainer}>
                {facilities.map((facility, index) => (
                    <div
                        key={index}
                        style={facilityCard}
                        id={`facility-${index}`}
                        onMouseEnter={() => handleHover(index)}
                        onMouseLeave={() => handleHoverOut(index)}
                    >
                        <img src={facility.img} alt={facility.name} style={imgStyle} />
                        <div style={facilityTitle}>
                            <h3 style={{ margin: "0" }}>{facility.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Facility;
