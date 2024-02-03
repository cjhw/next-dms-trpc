import { z } from "zod";
import { publicProcedure } from "./_public";

export const hello = publicProcedure
  .input(z.string().nullish())
  .query((opts) => `hello ${opts.input ?? opts.ctx.session.name ?? "world"}`);
