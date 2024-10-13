"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function SellerSetup() {
    const [shopName, setShopName] = useState("");
    const [shopDescription, setShopDescription] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [validIdImage, setValidIdImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [userId, setUserId] = useState(null); // State to hold userId
    const router = useRouter();

    // Fetch user ID on component mount
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await fetch('/api/user'); // Fetch user info from your API
                if (!response.ok) {
                    throw new Error('Failed to fetch user');
                }
                const userData = await response.json();
                setUserId(userData.id); // Set the userId from the fetched data
            } catch (error) {
                console.error('Error fetching user ID:', error);
                setErrorMessage("Unable to fetch user ID. Please log in again.");
            }
        };

        fetchUserId();
    }, []);

    // Change navbar background color on load
    useEffect(() => {
        const nav = document.getElementById("nav");
        if (nav) {
            nav.style.background = "white";
        }
    }, []);

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check for valid userId
        if (!userId) {
            setErrorMessage("User ID is not available");
            return; // Prevent form submission if userId is invalid
        }

        const formData = new FormData();
        formData.append("shopName", shopName);
        formData.append("shopDescription", shopDescription);
        if (profileImage) formData.append("shopImage", profileImage);
        if (validIdImage) formData.append("idImage", validIdImage);
        formData.append("userId", userId); // Use the fetched userId

        try {
            const response = await fetch("/api/seller/setup", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Seller setup completed.", data);
                router.push('/seller');
            } else {
                setErrorMessage(data.error || "Setup failed. Please try again.");
            }
        } catch (error) {
            setErrorMessage("An unexpected error occurred. Please try again.");
            console.error('Error during submission:', error);
        }
    };

    return (
        <section className="container min-h-[90vh] bg-gradient-to-br from-orange-600 to-orange-400 flex justify-center items-center">
            <form
                className="flex flex-col justify-center w-full p-5 bg-white rounded-2xl lg:w-1/3"
                onSubmit={handleSubmit}
            >
                <h1 className="my-2 text-3xl text-center">Seller Setup</h1>

                {errorMessage && (
                    <div className="mb-4 text-center text-red-500">{errorMessage}</div>
                )}

                <div className="flex flex-col input-group">
                    <label className="my-2" htmlFor="shopName">Shop Name:</label>
                    <input
                        className="p-2 border rounded-lg border-blue-950"
                        type="text"
                        name="shopName"
                        id="shopName"
                        value={shopName}
                        onChange={(e) => setShopName(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col input-group">
                    <label className="my-2" htmlFor="shopDescription">Shop Description:</label>
                    <textarea
                        className="p-2 border rounded-lg border-blue-950"
                        name="shopDescription"
                        id="shopDescription"
                        value={shopDescription}
                        onChange={(e) => setShopDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col input-group">
                    <label className="my-2" htmlFor="shopImage">Shop Profile Image:</label>
                    <input
                        className="p-2 border rounded-lg border-blue-950"
                        type="file"
                        name="shopImage"
                        id="shopImage"
                        accept="image/*"
                        onChange={(e) => setProfileImage(e.target.files[0])}
                        required
                    />
                </div>
                <div className="flex flex-col input-group">
                    <label className="my-2" htmlFor="idImage">Valid ID Image:</label>
                    <input
                        className="p-2 border rounded-lg border-blue-950"
                        type="file"
                        name="idImage"
                        id="idImage"
                        accept="image/*"
                        onChange={(e) => setValidIdImage(e.target.files[0])}
                        required
                    />
                </div>

                <button className="p-2 mt-4 text-white rounded-lg bg-blue-950 hover:bg-blue-900" type="submit">
                    Complete Setup
                </button>
            </form>
        </section>
    );
}
