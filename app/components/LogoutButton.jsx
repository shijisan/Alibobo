'use client'; 

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = () => {
        document.cookie = 'token=; Max-Age=0; path=/'; 

        router.push('/login');
    };

    return (
        <button className='p-2 text-white rounded bg-blue-950 hover:bg-blue-900' onClick={handleLogout}>
            Logout
        </button>
    );
}
