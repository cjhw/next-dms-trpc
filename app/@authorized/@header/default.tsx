import { getCurrentUserName } from "@/libs/auth";
import { Header } from "./header";

export default async function Default() {
  const userName = await getCurrentUserName();
  return <Header userName={userName} />;
}
