import styled from "styled-components";
import Image from "next/image";

export default function NaverLogin() {
  return (
    <a href="https://nid.naver.com/oauth2.0/authorize">
      <Image src="/login-naver.png" alt="login" width={200} height={50} />
    </a>
  );
}
