import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default function AdminDashboard() {
  const { sessionClaims } = auth();
  console.log(sessionClaims, 'cats');

  // If the user does not have the admin role, redirect them to the home page
  if (sessionClaims?.metadata?.role !== 'admin') {
    redirect('/admin/sign-in');
  }

  return (
    <>
      <h1>This is the admin dashboard</h1>
      <p>This page is restricted to users with the admin role.</p>
    </>
  );
}
