'use client';

import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Loader2, Terminal } from 'lucide-react';
import { Button } from '~/components/ui/button';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { Skeleton } from '~/components/ui/skeleton';
import { api } from '~/trpc/react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Textarea } from '~/components/ui/textarea';
import {
  Select,
  SelectItem,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

const formSchema = z.object({
  message: z.string().min(10, {
    message: 'Text must be at least 10 characters.',
  }),
});

const formSchemaStatus = z.object({
  status: z.string(),
});

type FormData = z.infer<typeof formSchema>;

type FormDataStatus = z.infer<typeof formSchemaStatus>;

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

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  });

  const formStatus = useForm<FormDataStatus>({
    resolver: zodResolver(formSchemaStatus),
    defaultValues: {
      status: '',
    },
  });

  const post = api.post.getTicket.useQuery({ id: ticket });

  const onResolve = api.post.resolveTicket.useMutation({
    onSuccess: async () => {
      toast.success('Ticket message sent!');
      await post.refetch();
    },
    onError: (_error) => {
      toast.error('Failed to send ticket message');
    },
  });

  const onStatusChange = api.post.saveStatus.useMutation({
    onSuccess: async () => {
      toast.success('Ticket status changed!');
      await post.refetch();
    },
    onError: (_error) => {
      toast.error('Failed to change ticket status');
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

  function onSubmit() {
    onResolve.mutate({ id: ticket, message: form.getValues().message });
  }

  function saveStatus() {
    onStatusChange.mutate({
      id: ticket,
      status: formStatus.getValues().status,
    });
  }
  return (
    <div className={'w-full'}>
      <Link href={'/admin/dashboard'} passHref>
        <Button variant={'outline'}>Go Back</Button>
      </Link>
      <div className={'mb-10'} />
      <Form {...formStatus}>
        <form
          onSubmit={formStatus.handleSubmit(saveStatus)}
          className="space-y-8"
        >
          <FormField
            control={formStatus.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status: {post.data?.status}</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={post.data?.status}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="OPEN">Not Started</SelectItem>
                        <SelectItem value="PROGRESS">In progress</SelectItem>
                        <SelectItem value="CLOSED">Complete</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Change the status for the ticket
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={
              formStatus.formState.isSubmitting || onStatusChange.isPending
            }
            type="submit"
          >
            {(formStatus.formState.isSubmitting ||
              onStatusChange.isPending) && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit status
          </Button>
        </form>
      </Form>

      <div className={'mb-10'} />
      {post && (
        <h1>
          Email of the user: <strong>{post.data?.email}</strong>
        </h1>
      )}
      <div className={'mb-3'} />
      {post && (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Problem by: {post.data?.name}</AlertTitle>
          <AlertDescription>{post.data?.description}</AlertDescription>
        </Alert>
      )}

      {!post.data?.message ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={Boolean(form.formState.isSubmitting)}
                      placeholder="Send your message to the user...."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The message that you will send to the user
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={form.formState.isSubmitting || onResolve.isPending}
              type="submit"
            >
              {(form.formState.isSubmitting || onResolve.isPending) && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Submit message
            </Button>
          </form>
        </Form>
      ) : (
        <Textarea disabled={true} value={post.data?.message} />
      )}
    </div>
  );
}
