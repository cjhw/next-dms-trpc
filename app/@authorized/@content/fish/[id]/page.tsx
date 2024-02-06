import { checkIsLogin } from "@/libs/auth";
import { prisma } from "@/prisma";
import { Metadata } from "next";
import { List } from "./list";

export const metadata: Metadata = {
  title: "fish 查看 - Next DMS tRPC",
};

const getItem = async (id: string) => {
  const isLogin = await checkIsLogin();
  if (!isLogin) throw new Error("Please login first");

  const item = await prisma.fish.findUnique({ where: { id } });
  return item ?? undefined;
};

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const item = await getItem(id);
  return (
    <div>
      <List item={item} />
    </div>
  );
}
