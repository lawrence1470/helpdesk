import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import Link from 'next/link';
import { api } from '~/trpc/server';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';

export default async function Page() {
  const posts = await api.post.getPosts();

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
      {posts.tickets && (
        <Table>
          <TableCaption>A list of your recent tickets.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Date Opened</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email used</TableHead>
              <TableHead className="text-right">Description</TableHead>
              <TableHead className="text-right">View</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.tickets.map((post) => (
              <TableRow>
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

                <TableCell>{post.email}</TableCell>
                <TableCell className="text-right">
                  {truncate(post.description, 25)}
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/dashboard/tickets/${post.id}`}>
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
