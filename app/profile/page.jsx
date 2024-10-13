import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import LogoutButton from '@/app/components/LogoutButton';
import { redirect } from 'next/navigation';

const JWT_SECRET = process.env.JWT_SECRET;

export default async function Profile() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  let user = null;

  if (token) {
    try {
      user = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      console.error('Invalid token:', error);
      // Redirect to login if the token is invalid or expired
      redirect('/login');
    }
  } else {
    // Redirect to login if there's no token
    redirect('/login');
  }

  return (
    <section>
      <h1>Welcome, {user.phone}!</h1>
      <p>This is your profile page.</p>
      <LogoutButton />
    </section>
  );
}
