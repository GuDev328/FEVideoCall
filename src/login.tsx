/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import axiosIns from "./axios";
const login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const res = await axiosIns.post("/users/login", {
            email,
            password,
        });

        localStorage.setItem("accessToken", res?.data.result.accessToken);
        localStorage.setItem("refreshToken", res?.data.result.refreshToken);
    };
    return (
        <div>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email"
            />
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
            />
            <button type="submit" onClick={handleLogin}>
                Login
            </button>
        </div>
    );
};

export default login;
