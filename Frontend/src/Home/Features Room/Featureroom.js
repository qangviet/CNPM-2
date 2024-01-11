// Featureroom.js
import React from "react";
import "./Featureroom.css";

const roomsData = [
    {
        id: 1,
        image: `${process.env.PUBLIC_URL}/Images/Background/r1.jpg`,
        name: "Single Deluxe",
        price: "$200 per night",
        info: "Spacious room with a beautiful view. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
        id: 2,
        image: `${process.env.PUBLIC_URL}/Images/Background/r2.jpg`,
        name: "Double Deluxe",
        price: "$180 per night",
        info: "Cozy room with modern amenities. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
    },
    {
        id: 3,
        image: `${process.env.PUBLIC_URL}/Images/Background/r3.jpg`,
        name: "Family Deluxe",
        price: "$220 per night",
        info: "Stylish room with a great city view. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut.",
    },
    {
        id: 4,
        image: `${process.env.PUBLIC_URL}/Images/Background/r4.jpg`,
        name: "Triple Deluxe",
        price: "$250 per night",
        info: "Beautiful room with ample space. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam.",
    },
    {
        id: 5,
        image: `${process.env.PUBLIC_URL}/Images/Background/r5.jpg`,
        name: "Double Basic",
        price: "$190 per night",
        info: "Comfortable room with a cozy ambiance. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis.",
    },
    {
        id: 6,
        image: `${process.env.PUBLIC_URL}/Images/Background/r6.jpg`,
        name: "Presidential",
        price: "$210 per night",
        info: "Modern room with a great view. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
    },
];

export default function Featureroom() {
    return (
        <div className="feature-room-container">
            <h2 className="feature-room-header">Featured Rooms</h2>
            <div className="rooms-container">
                {roomsData.map((room) => (
                    <div className="room" key={room.id}>
                        <img src={room.image} alt={room.name} className="room-image" />
                        <div className="room-details">
                            <h3 className="room-name">{room.name}</h3>
                            <p className="price">{room.price}</p>
                            <p className="info">{room.info}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
