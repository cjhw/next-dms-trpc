import { FetchBtn } from "@/app/FetchBtn";
import { Metadata } from "next";
import { FetchBtnSecret } from "./FetchBtnSecret";

export const metadata: Metadata = {
  title: "fish 管理 - Next DMS tRPC",
};

export default function Page() {
  return (
    <div>
      <p>fish</p>
      <FetchBtn />
      <FetchBtnSecret />
    </div>
  );
}
