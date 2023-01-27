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

  // getAllGenerations: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.generation.findMany();
  // }),
  // const getUser: object | null = await prisma.user.findUnique({
  //   where: {
  //     id: 22,
  //   },
  //   select: {
  //     email: true,
  //     name: true,
  //   },
  // })
  // getAllGenerations: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.generation.findUnique({
  //     where: {
  //       id: "1",
  //     },
  //     select: {
  //       prompt: true,
  //       name: true,
  //     }});

  //   })

  getAllGenerations: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.generation.findMany({
    include: {
      user: true,  
    },
  });
  }),

  getAllGenerationsTimeSents: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.generation.findMany();
  }),


  // getAllGenerations: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.generation.findMany({
  //     orderBy: {
  //       createdAt: "desc"
  //     },
  //   });
  // }),

  

  getSecretMessage: protectedProcedure.query(() => {
    return "Only logged in users can see this page.";
  }),

  // getDisplayView: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.
  // }),

});

