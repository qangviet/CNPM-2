import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

import axios from "axios";
import { toast } from "react-toastify";

export default function Register() {
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const isValidInputs = () => {
        if (!fullname) {
            toast.error("Full name is required");
            return false;
        }
        if (!phone) {
            toast.error("Phone is required");
            return false;
        }
        if (phone) {
            const regexCheck = /^(\d{4}\s\d{3}\s\d{3}|\d{10}|\d{3}\s\d{3}\s\d{4})$/;
            if (!regexCheck.test(phone)) {
                toast.error("Phone is invalid!");
                return;
            }
        }
        if (!username) {
            toast.error("Username is required");
            return false;
        }
        if (!password) {
            toast.error("Password is required");
            return false;
        }
        if (password !== confirmPassword) {
            toast.error("Your password is not the same");
            return false;
        }
        return true;
    };

    const handleRegister = async () => {
        let check = isValidInputs();
        if (check) {
            let respone = await axios.post("http://localhost:8088/api/register", {
                fullname: fullname,
                phone: phone,
                username: username,
                password: password,
            });
            let serverData = respone.data;
            if (serverData.EC === "0") {
                toast.success(serverData.EM);
                navigate("/login");
                return;
            }
            if (serverData.EC === "1") {
                toast.error(serverData.EM);
                return;
            }
            if (serverData.EC === "-1") {
                toast.error(serverData.EM);
                return;
            }
        }
    };

    return (
        <div className="registerContainer">
            <div className="welcomeMessage">
                <h2>WELCOME TO HOTEL</h2>
                <h3>STAY SMART</h3>
                <p>Book your stay and enjoy Luxury redefined at the most affordable rates.</p>
            </div>
            <div className="registerForm">
                <h2 className="registerTitle">USER REGISTER</h2>
                <div className="registerInputs">
                    <input
                        className="registerInput"
                        type="text"
                        placeholder="Full Name"
                        value={fullname}
                        onChange={(event) => {
                            setFullname(event.target.value);
                        }}
                    />
                    <input
                        className="registerInput"
                        type="text"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                    />
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
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />
                    <input
                        className="registerInput"
                        type="password"
                        placeholder="Re-enter password"
                        value={confirmPassword}
                        onChange={(event) => {
                            setConfirmPassword(event.target.value);
                        }}
                    />
                    <button className="registerButton" onClick={() => handleRegister()}>
                        REGISTER
                    </button>
                </div>
            </div>
        </div>
    );
}
