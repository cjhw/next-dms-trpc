import { DEFAULT_PUBLIC_ROUTE } from "@/constants/route";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(DEFAULT_PUBLIC_ROUTE);
}
