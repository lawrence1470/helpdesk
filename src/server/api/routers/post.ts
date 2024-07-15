import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';
import { clerkClient } from '@clerk/nextjs/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API);

export const postRouter = createTRPCRouter({
  getPosts: protectedProcedure.query(async ({ ctx }) => {
    try {
      const tickets = await ctx.db.post.findMany({
        where: {
          userId: ctx.userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return {
        tickets: tickets,
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: 'something went wrong',
      };
    }
  }),
  getAdminPosts: protectedProcedure.query(async ({ ctx }) => {
    try {
      const userId = ctx.userId;
      const user = await clerkClient.users.getUser(userId);
      const isAdmin = user.publicMetadata?.role === 'admin';
      if (!isAdmin) {
        throw new Error('You are not an admin');
      }
      const tickets = await ctx.db.post.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
      return {
        tickets: tickets,
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: 'something went wrong',
      };
    }
  }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().min(10),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call for the loading effect
      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        await ctx.db.post.create({
          data: {
            name: input.name,
            description: input.description,
            userId: ctx.userId,
            status: 'OPEN',
          },
        });
        return {
          success: true,
        };
      } catch (error) {
        throw new Error('Failed to create post');
      }
    }),

  getTicket: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const post = await ctx.db.post.findFirst({
        where: {
          id: input.id,
        },
      });

      if (!post) {
        throw new Error('ticket not found');
      }

      const user = await clerkClient.users.getUser(post.userId);
      const email = user.emailAddresses.find(
        (email) => email.id === user.primaryEmailAddressId,
      );

      return { ...post, email: email?.emailAddress };
    }),
  openTicket: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.post.update({
        where: {
          id: input.id,
        },
        data: {
          status: 'OPEN',
        },
      });
    }),

  resolveTicket: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        message: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.post.findFirst({
        where: {
          id: input.id,
        },
      });

      if (!post) {
        throw new Error('ticket not found');
      }
      const user = await clerkClient.users.getUser(post.userId);
      const email = user.emailAddresses.find(
        (email) => email.id === user.primaryEmailAddressId,
      );
      if (!email) {
        throw new Error('User has no email');
      }

      const { data, error } = await resend.emails.send({
        from: 'hello@thedinnertable.club',
        to: email.emailAddress,
        subject: 'Ticket update',
        html: `<p>${input.message}</p>`,
      });

      if (error) {
        throw new Error('Failed to send email');
      }

      return ctx.db.post.update({
        where: {
          id: input.id,
        },
        data: {
          message: input.message,
        },
      });

      return { success: true };
    }),
  saveStatus: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const statusType = {
        OPEN: 'OPEN',
        CLOSED: 'CLOSED',
        PROGRESS: 'PROGRESS',
      };

      if (input.status === 'PROGRESS') {
        return ctx.db.post.update({
          where: {
            id: input.id,
          },
          data: {
            status: 'PROGRESS',
          },
        });
      } else if (input.status === 'CLOSED') {
        return ctx.db.post.update({
          where: {
            id: input.id,
          },
          data: {
            status: 'CLOSED',
          },
        });
      } else {
        return ctx.db.post.update({
          where: {
            id: input.id,
          },
          data: {
            status: 'OPEN',
          },
        });
      }
    }),
});
