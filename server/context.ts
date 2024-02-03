import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  account: string;
  password: string;
  email: string;
  name: string;
}

const COOKIE_PASSWORD = "Kpgdq5fYdE&Sy#FjouDCWaa5mwrL8QNd";
const COOKIE_NAME = "sec";

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
