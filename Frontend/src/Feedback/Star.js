import React from "react";

const Star = (pros) => {
    return (
        <div>
            {Array.from({ length: pros.numberStar }, (_, index) => (
                <img
                    src={`${process.env.PUBLIC_URL}/Images/Icon/star_yellow.png`}
                    style={{
                        width: "24px",
                        height: "24px",
                        marginTop: "13px",
                        marginLeft: "5px",
                        padding: "1px",
                    }}
                    alt="star"
                />
            ))}
            {Array.from({ length: 5 - pros.numberStar }, (_, index) => (
                <img
                    src={`${process.env.PUBLIC_URL}/Images/Icon/star_gray.png`}
                    style={{
                        width: "24px",
                        height: "24px",
                        marginTop: "13px",
                        marginLeft: "5px",
                        padding: "1px",
                    }}
                    alt="star"
                />
            ))}
        </div>
    );
};

export default Star;
