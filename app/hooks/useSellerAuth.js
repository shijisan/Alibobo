import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const useSellerAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState(null); // Set initial user state to null
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user'); // Fetch user info from the API
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched user data:", data); // Log the full user data
          setUser(data); // Set user data including isSeller and isAdmin
        } else {
          console.error('Failed to fetch user data');
          setUser({ isSeller: false }); // Set default value if fetch fails
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser({ isSeller: false }); // Set default value on error
      }
      setLoading(false); // Set loading to false after fetch
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (loading) return; // Skip the redirection logic if still loading
  }, [loading]); // Include loading in dependency array

  return user; // Return the user object including isSeller
};
