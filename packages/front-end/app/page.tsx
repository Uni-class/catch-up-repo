"use client";

import Link from "next/link";

export default function Page() {
  return (
    <main>
      <p>메인 페이지</p>
      <div>
        <Link href={"/login"}>Login</Link>
      </div>
      <div>
        <Link href={"/dashboard"}>Dashboard</Link>
      </div>
    </main>
  );
}
