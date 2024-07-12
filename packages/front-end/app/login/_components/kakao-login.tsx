import styled from "styled-components";
import Image from "next/image";

export default function KaKaoLogin() {
  return (
    <a href="https://kauth.kakao.com/oauth/authorize">
      <Image src="/login-kakao.png" alt="login" width={200} height={50} />
    </a>
  );
}


