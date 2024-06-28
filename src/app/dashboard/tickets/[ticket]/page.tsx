import { api } from '~/trpc/server';

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

  console.log(post);
  return (
    <div className={'w-full'}>
      <span>cats</span>
    </div>
  );
}
