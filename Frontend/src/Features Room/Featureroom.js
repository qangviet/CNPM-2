// Featureroom.js
import React from "react";
import "./Featureroom.css";

const roomsData = [
    {
        id: 1,
        image: "https://th.bing.com/th/id/OIP.CrjVmMFLy0zcqFAR-5L6pgHaFj?pid=ImgDet&rs=1",
        name: "Single Deluxe",
        price: "$200 per night",
        info: "Spacious room with a beautiful view. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        id: 2,
        image: "https://th.bing.com/th/id/OIP.qBw8jRf1gLEVGi7dcVZshwHaE7?pid=ImgDet&w=1240&h=826&rs=1",
        name: "Double Deluxe",
        price: "$180 per night",
        info: "Cozy room with modern amenities. Sed ut perspiciatis unde omnis iste natus error sit voluptatem."
    },
    {
        id: 3,
        image: "https://photos.spareroom.com/images/flatshare/listings/large/20/74/207477314.jpg",
        name: "Family Deluxe",
        price: "$220 per night",
        info: "Stylish room with a great city view. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut."
    },
    {
        id: 4,
        image: "https://www.trulia.com/pictures/thumbs_5/zillowstatic/fp/c9e2d9d82e70bd55f6b04af3657142c9-full.jpg",
        name: "Triple Deluxe",
        price: "$250 per night",
        info: "Beautiful room with ample space. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam."
    },
    {
        id: 5,
        image: "https://cdn.vox-cdn.com/thumbor/hJanB_sIqqM-zHMxqQ3-zmnhmcs=/0x0:1200x800/1200x0/filters:focal(0x0:1200x800):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/10409095/415_East_85th_Street__8G_bed.jpg",
        name: "Double Basic",
        price: "$190 per night",
        info: "Comfortable room with a cozy ambiance. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis."
    },
    {
        id: 6,
        image: "https://brooklynbridgeparents.com/wp-content/uploads/2023/09/63-E-9th-St-2R.jpg",
        name: "Presidential",
        price: "$210 per night",
        info: "Modern room with a great view. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam."
    },
];

export default function Featureroom() {
    return (
        <div className="feature-room-container">
            <h2 className="feature-room-header">Featured Rooms</h2>
            <div className="rooms-container">
                {roomsData.map((room) => (
                    <div className="room" key={room.id}>
                        <img
                            src={room.image}
                            alt={room.name}
                            className="room-image"
                        />
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