import { Button } from "antd";
import Link from "next/link";
import { FetchBtnSecret } from "../@authorized/@content/fish/FetchBtnSecret";
import { FetchBtn } from "../FetchBtn";

export default function Home() {
  return (
    <main className="w-screen h-svh flex flex-col justify-center items-center">
      <p>client side fetching</p>
      <FetchBtn />
      <FetchBtnSecret />
      <div>
        <Link href="/login">
          <Button type="link">to login page</Button>
        </Link>
      </div>
    </main>
  );
}
