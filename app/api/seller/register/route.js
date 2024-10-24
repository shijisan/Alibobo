import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Ensure correct import
import { getToken, sign } from 'next-auth/jwt'; // Make sure to import sign method

export async function POST(request) {
  try {
    // Extract the token to get user details
    const token = await getToken({ req: request });

    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const userId = token.id; // Extract the user ID from the token
    const body = await request.json();
    const { shopName, shopDescription, idImage, shopProfilePic } = body;

    // Log input values for debugging
    console.log({ userId, shopName, idImage, shopProfilePic });

    // Validation: Ensure required fields are present
    if (!userId || !shopName || !idImage || !shopProfilePic) {
      return NextResponse.json(
        { error: "User ID, Shop name, ID image, and Shop profile picture are required." },
        { status: 400 }
      );
    }

    // Check if the user already has a seller account
    const existingSeller = await prisma.seller.findUnique({
      where: { userId }
    });

    if (existingSeller) {
      return NextResponse.json(
        { error: "User already has a seller account." },
        { status: 400 }
      );
    }

    // Find the user by userId
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    // Create the new seller account and link it to the user
    const newSeller = await prisma.seller.create({
      data: {
        userId: user.id,
        shopName,
        shopDescription: shopDescription || null,
        shopProfilePic, // Now required
        idImage, // Required ID image
      },
    });

    console.log('New seller created:', newSeller); // Log the seller creation

    // Update the user role to SELLER
    await prisma.user.update({
      where: { id: userId },
      data: {
        role: 'SELLER',
      },
    });

    // Create a new token with updated role
    const newToken = sign(
      {
        id: user.id,
        email: user.email,
        role: 'SELLER', // Updated role
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Set the desired expiration time
    );

    // Return the new token along with the seller info
    return NextResponse.json({
      message: 'Seller registration successful!',
      seller: newSeller,
      token: newToken, // Return the new token
    }, { status: 201 }); // Use 201 status for successful creation
  } catch (error) {
    console.error('Error registering seller:', error); // Log the exact error
    return NextResponse.json(
      { error: 'Failed to register seller: ' + error.message },
      { status: 500 }
    );
  }
}
