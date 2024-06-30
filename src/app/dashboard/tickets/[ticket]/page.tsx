import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Terminal } from 'lucide-react';
import { api } from '~/trpc/server';
import { Button } from '~/components/ui/button';
import Link from 'next/link';

export default async function Page({
  params,
}: {
  params: {
    ticket: string;
  };
}) {
  const ticket = params.ticket;
  if (!ticket || typeof ticket !== 'string') {
    return <div>Invalid ticket</div>;
  }

  const post = await api.post.getTicket({ id: ticket });

  return (
    <div className={'w-full'}>
      <Link href={'/dashboard/tickets'} passHref className={'mb-10'}>
        <Button variant={'outline'}>Go Back</Button>
      </Link>
      {post && (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Problem:</AlertTitle>
          <AlertDescription>{post.description}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
