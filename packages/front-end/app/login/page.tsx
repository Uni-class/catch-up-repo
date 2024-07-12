"use client";

import GoogleLogin from "./_components/google-login";
import KaKaoLogin from "./_components/kakao-login";
import NaverLogin from "./_components/naver-login";

export default function Page() {
  return (
    <main>
      <NaverLogin/>
      <KaKaoLogin/>
      <GoogleLogin/>
    </main>
  );
}
