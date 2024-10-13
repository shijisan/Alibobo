import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req) {
    const { firstName, lastName, phoneNum, password } = await req.json();

    if (!firstName || !lastName || !phoneNum || !password) {
        return new Response(JSON.stringify({ error: 'All fields are required.' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const HashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                name: `${firstName} ${lastName}`,
                phone: phoneNum,
                password: HashedPassword,
            },
        });

        return new Response(JSON.stringify(user), {
            status: 201,
            headers: {
                'Content-type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return new Response(JSON.stringify({ error: 'Error creating user.' }), {
            status: 500,
            headers: {
                'Content-type': 'application/json',
            },
        });
    }
}
