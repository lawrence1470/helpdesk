import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '~/components/ui/button';

export default function Page() {
  return (
    <div className={'h-screen'}>
      <div className={'flex items-center justify-center h-full flex-col'}>
        <SignIn />
        <Link href={'/'} className={'mt-10'}>
          <Button>Go Back</Button>
        </Link>
      </div>
    </div>
  );
}
