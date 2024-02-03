import { TRPCError, initTRPC } from "@trpc/server";
import { z } from "zod";
import type { Context } from "./context";

const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  // open for anyone
  hello: t.procedure
    .input(z.string().nullish())
    .query((opts) => `hello ${opts.input ?? opts.ctx.session.name ?? "world"}`),
  // checked in resolver
  secret: t.procedure.query((opts) => {
    if (!opts.ctx.session.id) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return {
      secret: "sauce",
    };
  }),
});

export type AppRouter = typeof appRouter;
