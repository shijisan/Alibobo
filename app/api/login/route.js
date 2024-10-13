import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET; // Store this in your environment variables

export async function POST(req) {
    const { phoneNum, password } = await req.json();

    if (!phoneNum || !password) {
        return new Response(JSON.stringify({ error: 'Phone number and password are required.' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { phone: phoneNum }, // Make sure this matches your model
        });

        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found.' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return new Response(JSON.stringify({ error: 'Invalid password.' }), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, phone: user.phone }, SECRET_KEY, { expiresIn: '1h' });

        return new Response(JSON.stringify({ message: 'Login successful', token }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return new Response(JSON.stringify({ error: 'Error logging in.' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } finally {
        await prisma.$disconnect(); // Disconnect Prisma client
    }
}
