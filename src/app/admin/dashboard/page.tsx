'use client';

import { redirect } from 'next/navigation';
import { api } from '~/trpc/react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { Badge } from '~/components/ui/badge';
import Link from 'next/link';
import { Button } from '~/components/ui/button';
import { Skeleton } from '~/components/ui/skeleton';

export default function AdminDashboard() {
  const posts = api.post.getAdminPosts.useQuery();

  if (posts.isLoading) {
    return (
      <div className="flex items-center space-x-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  if (posts.error) {
    redirect('/');
  }

  function convertDate(date: Date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  function truncate(str: string, n: number) {
    return str.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  return (
    <div className={'w-full'}>
      {posts.data?.tickets && (
        <Table>
          <TableCaption>A list of all submitted tickets.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Date Opened</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Description</TableHead>
              <TableHead className="text-right">View</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.data?.tickets.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">
                  {convertDate(post.createdAt)}
                </TableCell>
                <TableCell>
                  {post.status === 'OPEN' ? (
                    <Badge variant="outline">Open</Badge>
                  ) : (
                    <Badge>Closed</Badge>
                  )}
                </TableCell>
                <TableCell>{post.name}</TableCell>

                <TableCell className="text-right">
                  {truncate(post.description, 25)}
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/admin/dashboard/tickets/${post.id}`}>
                    <Button>View</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
