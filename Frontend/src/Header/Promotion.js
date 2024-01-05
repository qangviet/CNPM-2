import React, { useEffect, useRef } from "react";
import "./promotion.css";

const Promotion = () => {
    const promotions = [
        { title: "Special Offer", price: "$199", image: "https://dlq00ggnjruqn.cloudfront.net/prometheus/getImage?id=186156" },
        { title: "Winter Deal", price: "$149", image: "https://dlq00ggnjruqn.cloudfront.net/prometheus/getImage?id=186156" },
        { title: "Spring Sale", price: "$129", image: "https://dlq00ggnjruqn.cloudfront.net/prometheus/getImage?id=186156" },
        { title: "Special Offer", price: "$199", image: "https://dlq00ggnjruqn.cloudfront.net/prometheus/getImage?id=186156" },
        { title: "Winter Deal", price: "$149", image: "https://dlq00ggnjruqn.cloudfront.net/prometheus/getImage?id=186156" },
        { title: "Spring Sale", price: "$129", image: "https://dlq00ggnjruqn.cloudfront.net/prometheus/getImage?id=186156" },
        { title: "Spring Sale", price: "$129", image: "https://dlq00ggnjruqn.cloudfront.net/prometheus/getImage?id=186156" },
    ];

    const promotionListRef = useRef(null);

    useEffect(() => {
        const promotionList = promotionListRef.current;

        if (promotionList) {
            let currentPosition = 0;
            const itemWidth = promotionList.offsetWidth / promotions.length;
            let direction = -1;

            const animatePromotion = () => {
                currentPosition += direction * itemWidth;
                if (currentPosition >= 0 || currentPosition <= -(promotionList.offsetWidth - itemWidth)) {
                    direction *= -1;
                }

                promotionList.style.transition = "transform 1s ease-in-out";
                promotionList.style.transform = `translateX(${currentPosition}px)`;

                setTimeout(() => {
                    animatePromotion();
                }, 1000);
            };

            setTimeout(() => {
                animatePromotion();
            }, 1000); // Start after 5 seconds initially
        }
    }, [promotions]);

    return (
        <div className="promotionSection">
            <h2>Promotions</h2>
            <div className="promotionList" ref={promotionListRef}>
                {promotions.map((item, index) => (
                    <div className="promotionItem" key={index}>
                        <img src={item.image} alt={item.title} />
                        <h3>{item.title}</h3>
                        <p>{item.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Promotion;
