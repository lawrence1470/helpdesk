import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { api } from '~/trpc/server';

export default async function Home() {
  const user = await api.user.getUserAdmin();
  const isAdmin = user.isAdmin;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white">
      <div className="flex flex-col items-center gap-2">
        <p className="text-2xl text-white"></p>
      </div>
      <div className={'px-10'}>
        <Card>
          <CardHeader>
            {isAdmin ? (
              <CardTitle>Welcome back Admin</CardTitle>
            ) : (
              <CardTitle>Welcome to the support</CardTitle>
            )}
            <CardDescription>
              <SignedOut>
                Looks like you are having an issue, lets create a support
                ticket.
              </SignedOut>
              <SignedIn>
                {isAdmin ? (
                  <span>Continue to the dashboard to manage tickets</span>
                ) : (
                  <span>
                    Thanks for signing up, now lets get that ticket logged
                  </span>
                )}
              </SignedIn>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignedOut>
              <Button>
                <SignInButton />
              </Button>
            </SignedOut>
            <div className={'absolute top-3 right-3'}>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
            <SignedIn>
              {isAdmin ? (
                <Link href={'/admin/dashboard'}>
                  <Button>Admin Dashboard</Button>
                </Link>
              ) : (
                <Link href={'/dashboard'}>
                  <Button>Dashboard</Button>
                </Link>
              )}
            </SignedIn>
          </CardContent>
          <SignedOut>
            <CardFooter>
              <Link href={'/admin/sign-in'}>
                <Button variant="link">Are you an admin?</Button>
              </Link>
            </CardFooter>
          </SignedOut>
        </Card>
      </div>
    </main>
  );
}
