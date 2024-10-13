"use client";

import { useSellerAuth } from "../hooks/useSellerAuth"; // Import your custom hook
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Seller() {
    const user = useSellerAuth(); // Get user data, including isSeller and verified status
    const router = useRouter();

    useEffect(() => {
        if (user) {
            if (!user.isSeller) {
                // Redirect to setup if user is not a seller
                router.replace('/seller/setup');
            } else if (!user.verified) {
                // Redirect to verification page if ID isn't verified
                router.replace('/seller/verify');
            }
        }
    }, [user, router]);

    return (
        <>
            <h1>Welcome to the Seller Dashboard</h1>
            {/* Additional seller dashboard content */}
        </>
    );
}
