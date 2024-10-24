"use client";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react"; // Import signIn from next-auth

export default function StartSelling() {
  const [shopName, setShopName] = useState("");
  const [shopDescription, setShopDescription] = useState("");
  const [uploadedIdImage, setUploadedIdImage] = useState(null);
  const [uploadedProfilePic, setUploadedProfilePic] = useState(null);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/latest/global/all.js";
    script.async = true;
    script.onload = () => {
      window.myWidget = window.cloudinary.createUploadWidget(
        {
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
          uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        },
        (error, result) => {
          if (error) {
            console.error("Error uploading image:", error);
            setMessage("Image upload failed. Please try again.");
            setIsUploading(false);
            return;
          }
          if (result && result.event === "success") {
            console.log("Upload Result:", result.info);
            if (result.info.resource_type === "image" && window.uploadType === "idImage") {
              setUploadedIdImage(result.info);
              console.log("ID Image Uploaded:", result.info);
            } else if (result.info.resource_type === "image" && window.uploadType === "profilePic") {
              setUploadedProfilePic(result.info);
              console.log("Profile Picture Uploaded:", result.info);
            }
            setIsUploading(false);
          }
        }
      );
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleImageUpload = (uploadType) => {
    window.uploadType = uploadType; // Set the upload type (ID image or profile pic)
    setIsUploading(true);
    window.myWidget.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isUploading) {
      setMessage("Please wait for image upload to complete.");
      return;
    }

    // Ensure required fields are filled
    if (!shopName || !uploadedIdImage) {
      setMessage("Shop name and ID image are required.");
      return;
    }

    try {
      const registrationResponse = await fetch("/api/seller/register", {
        method: "POST",
        body: JSON.stringify({
          shopName,
          shopDescription,
          idImage: uploadedIdImage.secure_url,
          // Include profile pic only if it has been uploaded
          shopProfilePic: uploadedProfilePic ? uploadedProfilePic.secure_url : null,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!registrationResponse.ok) {
        const errorText = await registrationResponse.text();
        throw new Error(errorText);
      }

      // Refresh token or re-fetch session after successful registration
      await signIn("credentials", { redirect: false }); // This will refresh the token/session

      setMessage("Registration successful! Waiting for verification.");
    } catch (error) {
      setMessage("Error registering as seller: " + error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-8">
      <h1 className="mb-4 text-2xl font-bold">Start Selling</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Shop Name</label>
          <input
            type="text"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Shop Description</label>
          <textarea
            value={shopDescription}
            onChange={(e) => setShopDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">ID Image (Required for verification)</label>
          <button
            type="button"
            className="w-full px-3 py-2 text-center border border-gray-300 rounded-md cloudinary-button"
            onClick={() => handleImageUpload("idImage")}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload ID Image"}
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Shop Profile Picture (Optional)</label>
          <button
            type="button"
            className="w-full px-3 py-2 text-center border border-gray-300 rounded-md cloudinary-button"
            onClick={() => handleImageUpload("profilePic")}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload Profile Picture"}
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600"
          disabled={isUploading}
        >
          Register as Seller
        </button>
      </form>

      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}
