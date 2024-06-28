import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white">
      <div className="flex flex-col items-center gap-2">
        <p className="text-2xl text-white"></p>
      </div>
      <div className={'px-10'}>
        <Card>
          <CardHeader>
            <CardTitle>Welcome to the support</CardTitle>
            <CardDescription>
              <SignedOut>
                Looks like you are having an issue, lets create a support
                ticket.
              </SignedOut>
              <SignedIn>
                Thanks for signing up, now lets get that ticket logged
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
              <Link href={'/dashboard'}>
                <Button>Dashboard</Button>
              </Link>
            </SignedIn>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
