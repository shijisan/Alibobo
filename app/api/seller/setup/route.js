import { PrismaClient } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';

// Initialize Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const prisma = new PrismaClient();

// Handle GET requests (if needed for fetching sellers or related data)
export async function GET(req) {
    try {
        const sellers = await prisma.seller.findMany();
        return new Response(JSON.stringify(sellers), { status: 200 });
    } catch (error) {
        console.error("Error fetching sellers:", error);
        return new Response(JSON.stringify({ message: "Failed to fetch sellers" }), { status: 500 });
    }
}

export async function POST(req) {
    const formData = await req.formData();
    const shopName = formData.get('shopName');
    const shopDescription = formData.get('shopDescription');
    const shopImage = formData.get('shopImage');
    const idImage = formData.get('idImage');
    const userIdString = formData.get('userId');

    // Convert userId to an integer
    const userId = parseInt(userIdString, 10);

    // Log form data for debugging
    console.log("Form Data:", { shopName, shopDescription, shopImage, idImage, userIdString, userId });

    // Check if userId is a valid number
    if (isNaN(userId)) {
        return new Response(JSON.stringify({ message: "Invalid user ID" }), { status: 400 });
    }

    try {
        // Check if user already has a seller account
        const existingSeller = await prisma.seller.findUnique({
            where: { userId: userId },
        });

        if (existingSeller) {
            return new Response(JSON.stringify({ message: "User already has a seller account" }), { status: 400 });
        }

        let shopImageUrl = null;
        let idImageUrl = null;

        if (shopImage) {
            const shopBuffer = await getImageBuffer(shopImage);
            shopImageUrl = await uploadToCloudinary(shopBuffer, 'alibobo/sellers/shop_images');
        }

        if (idImage) {
            const idBuffer = await getImageBuffer(idImage);
            idImageUrl = await uploadToCloudinary(idBuffer, 'alibobo/sellers/id_images');
        }

        // Create the seller
        const seller = await prisma.seller.create({
            data: {
                shopName,
                shopDescription,
                shopImage: shopImageUrl || null,
                validIdImage: idImageUrl || null,
                verified: false,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });

        // Update the user's isSeller field to true after successfully creating the seller
        await prisma.user.update({
            where: { id: userId },
            data: { isSeller: true },
        });

        return new Response(JSON.stringify(seller), { status: 201 });
    } catch (error) {
        console.error("Error saving seller:", error);
        return new Response(JSON.stringify({ message: "Failed to save seller", error: error.message }), { status: 500 });
    }
}

// Helper function to convert the image to a Buffer
const getImageBuffer = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    return Buffer.from(arrayBuffer);
};

// Helper function to upload image to Cloudinary
const uploadToCloudinary = (buffer, folder) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({
            folder: folder,
        }, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.secure_url);
            }
        });

        uploadStream.end(buffer);
    });
};
