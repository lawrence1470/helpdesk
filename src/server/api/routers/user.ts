import { clerkClient } from '@clerk/nextjs/server';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '~/server/api/trpc';

export const userRouter = createTRPCRouter({
  getUserAdmin: publicProcedure.query(async ({ ctx, input }) => {
    try {
      const userId = ctx?.userId;
      if (!userId) {
        return {
          isAdmin: false,
        };
      }
      const user = await clerkClient.users.getUser(userId);
      const isAdmin = user.publicMetadata?.role === 'admin';
      return {
        isAdmin,
      };
    } catch (error) {
      throw new Error('Failed to get user');
    }
  }),
});
