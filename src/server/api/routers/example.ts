import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${JSON.stringify(input)}`,
      };
    }),

  getAllUsers: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),

  getAllGenerations: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.generation.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "Only logged in users can see this page.";
  }),

});

