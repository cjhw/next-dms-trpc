import { Metadata } from "next";
import { SearchForm } from "./search-form";

export const metadata: Metadata = {
  title: "fish 管理 - Next DMS tRPC",
};

export default function Page() {
  return (
    <div>
      <SearchForm />
    </div>
  );
}
