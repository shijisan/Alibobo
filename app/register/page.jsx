"use client";

import { useEffect, useState } from "react";

export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [password, setPassword] = useState("");

    // Optional: This effect can be retained if needed.
    useEffect(() => {
        const nav = document.getElementById("nav");
        if (nav) {
            nav.style.background = "white"; // Ensure nav exists before modifying
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ firstName, lastName, phoneNum, password }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log("User registered.", data);
        } else {
            console.error("Error registering user:", data.error);
        }
    };

    return (
        <section className="container min-h-[90vh] bg-gradient-to-br from-orange-600 to-orange-400 flex justify-center items-center">
            <form
                className="flex flex-col justify-center w-full p-5 bg-white rounded-2xl lg:w-1/3"
                onSubmit={handleSubmit} // Ensure the submit handler is attached
            >
                <h1 className="my-2 text-3xl text-center">Register</h1>
                <div className="flex gap-3 mt-8 input-group">
                    <div id="firstName" className="lg:w-1/2">
                        <label className="my-2" htmlFor="firstName">First Name:</label>
                        <input
                            className="w-full p-2 border rounded-lg border-blue-950"
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div id="lastName" className="lg:w-1/2">
                        <label className="my-2" htmlFor="lastName">Last Name:</label>
                        <input
                            className="w-full p-2 border rounded-lg border-blue-950"
                            type="text"
                            name="lastName"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-col input-group">
                    <label className="my-2" htmlFor="phoneNum">Phone:</label>
                    <input
                        className="p-2 border rounded-lg border-blue-950"
                        type="tel"
                        name="phoneNum"
                        id="phoneNum"
                        value={phoneNum}
                        onChange={(e) => setPhoneNum(e.target.value)}
                    />
                </div>
                <div className="flex flex-col input-group">
                    <label className="my-2" htmlFor="password">Password:</label>
                    <input
                        className="p-2 border rounded-lg border-blue-950"
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="p-2 mt-4 text-white rounded-lg bg-blue-950 hover:bg-blue-900" type="submit">Register</button>
            </form>
        </section>
    );
}
