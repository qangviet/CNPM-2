/* login.jsx */

import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Login.css";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async () => {
        if (!username) {
            toast.error("Please enter your username");
            return;
        }
        if (!password) {
            toast.error("Please enter your password");
            return;
        }
        let respone = await axios.post("http://localhost:8088/api/login", {
            username,
            password,
        });
        if (respone && respone.data && respone.data.EC === "0") {
            let data_acc = {
                isAuthenticated: true,
                token: respone.data.DT.id,
                name: respone.data.DT.name,
                username: username,
                role: respone.data.DT.identity,
            };
            console.log(data_acc);
            toast.success(respone.data.EM);
            sessionStorage.setItem("account", JSON.stringify(data_acc));

            if (data_acc.role === 1) {
                navigate("/");
                window.location.reload();
            } else if (data_acc.role === 2) {
                navigate("/employee");
                window.location.reload();
            } else if (data_acc.role === 3) {
                navigate("/admin");
                window.location.reload();
            }
            return;
        } else {
            toast.error(respone.data.EM);
            return;
        }
    };
    return (
        <div className="loginContainer">
            <div className="welcomeMessage">
                <h2>WELCOME TO HOTEL</h2>
                <h3>STAY SMART</h3>
                <p>Book your stay and enjoy Luxury redefined at the most affordable rates.</p>
            </div>
            <div className="loginForm">
                <h2 className="loginTitle">USER LOGIN</h2>
                <div className="registerInputs">
                    <input
                        className="registerInput"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <input
                        className="registerInput"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <button className="registerButton" onClick={() => handleLogin()}>
                        LOGIN
                    </button>
                    <p>
                        Don't have an account? <Link to="/register">Register here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
