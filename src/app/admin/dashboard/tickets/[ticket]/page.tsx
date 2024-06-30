'use client';

import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Terminal } from 'lucide-react';
import { Button } from '~/components/ui/button';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { Skeleton } from '~/components/ui/skeleton';

import { api } from '~/trpc/react';

export default function Page({
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

  const post = api.post.getTicket.useQuery({ id: ticket });

  const onResolve = api.post.resolveTicket.useMutation({
    onSuccess: () => {
      toast.success('Ticket resolved!');
      post.refetch();
    },
    onError: (error) => {
      toast.error('Failed to resolve ticket');
    },
  });

  const onOpen = api.post.openTicket.useMutation({
    onSuccess: () => {
      toast.success('Ticket opened!');
      post.refetch();
    },
    onError: (error) => {
      toast.error('Failed to open ticket');
    },
  });

  if (post.isLoading) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  if (post.error) {
    return <div>Error: {post.error.message}</div>;
  }

  return (
    <div className={'w-full'}>
      <Link href={'/admin/dashboard'} passHref>
        <Button variant={'outline'}>Go Back</Button>
      </Link>
      <div className={'mb-10'} />
      {post && (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Problem by: {post.data?.name}</AlertTitle>
          <AlertDescription>{post.data?.description}</AlertDescription>
        </Alert>
      )}

      {post && post.data?.status === 'OPEN' && (
        <Button
          disabled={onResolve.isPending || post.isRefetching}
          onClick={async () => {
            await onResolve.mutateAsync({ id: ticket });
          }}
          className={'mt-10'}
        >
          Resolve
        </Button>
      )}
      {post && post.data?.status === 'CLOSED' && (
        <Button
          disabled={onOpen.isPending || post.isRefetching}
          onClick={async () => {
            await onOpen.mutateAsync({ id: ticket });
          }}
          className={'mt-10'}
        >
          Open
        </Button>
      )}
    </div>
  );
}
