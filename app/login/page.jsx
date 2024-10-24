"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Updated import for useRouter

export default function Login() {
  const router = useRouter(); // For redirecting after login
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null); // State for error messages

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error on submit

    // Use NextAuth's signIn function
    const result = await signIn('credentials', {
      redirect: false, // Prevent automatic redirection
      email: formData.email,
      password: formData.password,
    });

    if (result?.error) {
      setError("Invalid email or password."); // Set a generic error message if login failed
    } else {
      // Redirect to the dashboard or homepage on success
      console.log("Login successful.");
      router.push('/account'); // Redirect to the /account page on successful login
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-50">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-blue-950">Login to Your Account</h2>
        {error && <p className="text-center text-red-500">{error}</p>} {/* Display error messages */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 border rounded-md focus:ring-orange-400 focus:border-orange-400"
              autoComplete="email" // Added for better user experience
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 border rounded-md focus:ring-orange-400 focus:border-orange-400"
              autoComplete="current-password" // Added for better user experience
            />
          </div>

          <div className="flex items-center justify-center w-full">
            <button
              type="submit"
              className="w-1/2 py-2 text-white bg-orange-400 rounded-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
            >
              Login
            </button>
            <a href="/register" className="w-1/2 text-center text-blue-950">Register</a>
          </div>
        </form>
      </div>
    </div>
  );
}
