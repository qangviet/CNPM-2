import React, { useState, useEffect } from "react";

const Facility = () => {
    const [facilities, setFacilities] = useState([
        {
            name: "Room",
            img: "https://th.bing.com/th/id/R.5dbb5ef85962b2209b071c30c140a62d?rik=SYA1XIpW9ieVHg&pid=ImgRaw&r=0",
        },
        {
            name: "Gym",
            img: "https://media1.metrotimes.com/metrotimes/imager/u/slideshow/24804463/gym_shutterstock_721723381.jpg",
        },
        {
            name: "Restaurant",
            img: "https://media-cdn.tripadvisor.com/media/photo-s/28/11/f0/30/home-hanoi-restaurant.jpg",
        },
        {
            name: "Swimming Pool",
            img: "https://th.bing.com/th/id/R.4c709ed839add9bf5b421d1766b90afd?rik=66i6jfFIW3rSiA&pid=ImgRaw&r=0",
        },
        {
            name: "Foods and Drinks",
            img: "https://th.bing.com/th/id/R.89f8264162c2562ac1867d8d86ec1386?rik=Ri308As6q5IFgg&riu=http%3a%2f%2fwww.honeytiesblog.com%2fwp-content%2fuploads%2f2015%2f05%2fdrinks_and_food_on_bar.jpg&ehk=mWQWfqo%2f3DXhSNV%2b0LzApJjtOCHMudMCrrOzMfHBXwY%3d&risl=&pid=ImgRaw&r=0",
        },
        {
            name: "Grand Piano",
            img: "https://www.europianosnaples.com/wp-content/uploads/2018/03/Piano-in-Hong-Kong.jpeg",
        },
        {
            name: "Spa",
            img: "https://i.pinimg.com/originals/a6/4a/8e/a64a8e6bf709cd10e1e0563a13fc7cff.jpg",
        },
        {
            name: "Sunset View",
            img: "https://th.bing.com/th/id/R.d86616af4c35a891f2adefa4ac2e0fef?rik=AvPVM5OpGNy9qA&riu=http%3a%2f%2fwww.hiptravelmama.com%2fwp-content%2fuploads%2f2012%2f01%2fsunset-photo-of-shore-hotel.jpg&ehk=jtylpOOmSBrWvnVLPqvqxoI5cux370Zu%2bc3mB3isrtM%3d&risl=&pid=ImgRaw&r=0",
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
