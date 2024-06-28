'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { Button } from '~/components/ui/button';
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
import { Textarea } from '~/components/ui/textarea';
import { Input } from '~/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import React from 'react';
import { toast } from 'react-toastify';

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(50, {
      message: 'Username must be at most 50 characters.',
    }),
  email: z.string().email({
    message: 'Invalid email address.',
  }),
  description: z
    .string()
    .min(10, {
      message: 'Description must be at least 10 characters.',
    })
    .max(1000, {
      message: 'Description must be at most 1000 characters.',
    }),
});

type FormData = z.infer<typeof formSchema>;

export default function Page() {
  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      toast.success('Ticket created successfully');
    },
    onError: (error) => {
      toast.error('Failed to create Ticket');
    },
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      description: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createPost.mutate(values);
    form.reset();
  }

  return (
    <div className={'w-3/4'}>
      <Card>
        <CardHeader>
          <CardTitle>What is your problem?</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={
                          form.formState.isSubmitting || createPost.isPending
                        }
                        placeholder="Chuck Norris"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The name we will use to address you.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={
                          form.formState.isSubmitting || createPost.isPending
                        }
                        placeholder="Norris@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      We will use this email to contact you.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={
                          form.formState.isSubmitting || createPost.isPending
                        }
                        placeholder="I have a problem with my account..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Please describe your problem in detail.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={form.formState.isSubmitting || createPost.isPending}
                type="submit"
              >
                {(form.formState.isSubmitting || createPost.isPending) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
