"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const VerifyIDPage = () => {
  const [unverifiedSellers, setUnverifiedSellers] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUnverifiedSellers = async () => {
      try {
        const res = await fetch('/api/seller/unverified');
        if (!res.ok) {
          throw new Error('Failed to fetch unverified sellers');
        }
        const data = await res.json();
        setUnverifiedSellers(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUnverifiedSellers();
  }, []);

  const handleVerification = async (id, isVerified) => {
    try {
      const res = await fetch(`/api/seller/verify/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ verified: isVerified }),
      });

      if (!res.ok) {
        throw new Error('Failed to update seller verification status');
      }

      // Refresh the list of unverified sellers after the operation
      router.reload();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Verify Sellers and IDs</h1>
      {error && <p className="error">{error}</p>}
      <ul>
        {unverifiedSellers.length === 0 ? (
          <li>No unverified sellers found.</li>
        ) : (
          unverifiedSellers.map((seller) => (
            <li key={seller.id}>
              <p>
                <strong>Shop Name:</strong> {seller.shopName} <br />
                <strong>ID Image:</strong> <img src={seller.idImage} alt={`${seller.shopName} ID`} width="100" />
              </p>
              <button onClick={() => handleVerification(seller.id, true)}>Verify</button>
              <button onClick={() => handleVerification(seller.id, false)}>Deny</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default VerifyIDPage;
