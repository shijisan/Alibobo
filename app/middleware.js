// middleware.js

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET; // Make sure to set your JWT secret in environment variables

export async function middleware(req) {
    // Get the token from the authorization header
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        // Attach the user info to the request for use in your API routes
        req.user = decoded;
        return NextResponse.next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
}

// Specify the paths that should use this middleware
export const config = {
    matcher: ['/profile'], // Adjust the paths as needed
};
