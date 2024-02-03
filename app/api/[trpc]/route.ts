import { createContext } from "@/server/context";
import { appRouter } from "@/server/router";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api",
    req,
    router: appRouter,
    createContext,
  });
export { handler as GET, handler as POST };
