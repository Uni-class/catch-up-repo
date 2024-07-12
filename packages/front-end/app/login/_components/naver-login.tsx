import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export default function NaverLogin() {
  return (
    <Link
      href={{
        pathname: "https://nid.naver.com/oauth2.0/authorize",
        query: { client_id: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID },
      }}
    >
      <Image src="/login-naver.png" alt="login" width={200} height={50} />
    </Link>
  );
}
