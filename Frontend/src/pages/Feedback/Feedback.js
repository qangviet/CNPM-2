import React, { useState } from "react";
import "./Feedback.css"; // Import the CSS file

const Feedback = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic to handle form submission (e.g., send data to server)
        console.log("Form data submitted:", formData);
    };

    return (
        <div className="feedback-container">
            <h2>Feedback</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <textarea
                        id="message"
                        name="message"
                        placeholder="Enter your message here"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Feedback;
