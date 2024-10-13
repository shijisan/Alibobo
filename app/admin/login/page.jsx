"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for client-side navigation

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter(); // Initialize useRouter for navigation

    // Change navbar background color on load
    useEffect(() => {
        const nav = document.getElementById("nav");
        if (nav) {
            nav.style.background = "white"; // Change nav background color
        }
    }, []);

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        const response = await fetch("/api/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }), // Send username and password
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Admin logged in.", data);
            // Store token in a cookie instead of local storage
            document.cookie = `token=${encodeURIComponent(data.token)}; path=/; SameSite=Lax; Secure`;
            router.push('/admin/dashboard'); // Redirect to the admin dashboard page
        } else {
            setErrorMessage(data.error || "Login failed. Please try again.");
        }
    };

    return (
        <section className="container min-h-[90vh] bg-gradient-to-br from-orange-600 to-orange-400 flex justify-center items-center">
            <form
                className="flex flex-col justify-center w-full p-5 bg-white rounded-2xl lg:w-1/3"
                onSubmit={handleSubmit} // Attach the submit handler
            >
                <h1 className="my-2 text-3xl text-center">Admin Login</h1>

                {errorMessage && (
                    <div className="mb-4 text-center text-red-500">{errorMessage}</div>
                )}

                <div className="flex flex-col input-group">
                    <label className="my-2" htmlFor="username">Username:</label>
                    <input
                        className="p-2 border rounded-lg border-blue-950"
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                <button className="p-2 mt-4 text-white rounded-lg bg-blue-950 hover:bg-blue-900" type="submit">
                    Login
                </button>
            </form>
        </section>
    );
}
