"use client";

import LoginButton from "./_components/login-button";

export default function Page() {
  return (
    <main>
      <LoginButton
        text="카카오 로그인"
        iconURL="/icon/icon-kakao.svg"
        provider="kakao"
        pathname="https://kauth.kakao.com/oauth/authorize"
        query={{
          client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
          redirect_uri: process.env.NEXT_PUBLIC_KAKAO_CALLBACK_URL,
        }}
      />
      <LoginButton
        text="네이버 로그인"
        iconURL="/icon/icon-naver.svg"
        provider="naver"
        pathname="https://nid.naver.com/oauth2.0/authorize"
        query={{
          client_id: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
          redirect_uri: process.env.NEXT_PUBLIC_NAVER_CALLBACK_URL,
          state: "test", // redirect돼서 페이지 돌아왔을 때 받는 문자열, 로그인 후 되돌아갈 url 적으면 좋음
        }}
      />
      <LoginButton
        text="구글 로그인"
        iconURL="/icon/icon-google.svg"
        provider="google"
        pathname="https://accounts.google.com/o/oauth2/v2/auth"
        query={{
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL,
          scope: "email profile openid",
        }}
      />
    </main>
  );
}
