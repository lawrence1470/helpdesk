import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className={'h-screen'}>
      <div className={'flex items-center justify-center h-full'}>
        <SignUp fallbackRedirectUrl={'/dashboard'} />
      </div>
    </div>
  );
}
