import { COOKIE_NAME, COOKIE_PASSWORD } from "@/constants/api";
import type { User } from "@prisma/client";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function createContext(opts: FetchCreateContextFnOptions) {
  const session = await getIronSession<
    Partial<Pick<User, "id" | "account" | "name">>
  >(cookies(), {
    password: COOKIE_PASSWORD,
    cookieName: COOKIE_NAME,
  });
  return {
    session,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
