"use server";

import { DEFAULT_PUBLIC_ROUTE } from "@/constants/route";
import { getSession } from "@/libs/auth";
import { redirect } from "next/navigation";

export async function logout(prevState: unknown, formData: FormData) {
  try {
    const user = await getSession();
    user.destroy();
  } catch (err) {
    if (err instanceof Error) return { message: err.message };
    return { message: "Server error" };
  }
  redirect(DEFAULT_PUBLIC_ROUTE);
}
