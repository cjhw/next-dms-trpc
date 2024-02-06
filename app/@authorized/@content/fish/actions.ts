"use server";

import { checkIsLogin } from "@/libs/auth";
import { prisma } from "@/prisma";

export async function getList(prevState: unknown, formData: FormData) {
  try {
    const isLogin = await checkIsLogin();

    if (!isLogin) throw new Error("Please login first");

    const name = formData.get("name")?.toString() ?? "";
    const col1 = formData.get("col1")?.toString() ?? "";
    const start = formData.get("start")?.toString() ?? "1900-01-01";
    const end = formData.get("end")?.toString() ?? "2999-12-31";

    const list = await prisma.fish.findMany({
      where: {
        name: {
          contains: name,
        },
        col1: {
          contains: col1,
        },
        createdAt: {
          gte: new Date(start),
          lte: new Date(end),
        },
      },
      select: {
        id: true,
        name: true,
        col1: true,
        createdAt: true,
      },
    });

    return { data: list };
  } catch (err) {
    if (err instanceof Error) return { message: err.message, status: 401 };
    return { message: "Server error" };
  }
}
