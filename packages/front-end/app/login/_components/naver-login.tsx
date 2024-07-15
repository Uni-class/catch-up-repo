import Image from "next/image";
import Link from "next/link";

export default function NaverLogin() {
  return (
    <Link
      href={{
        pathname: "https://nid.naver.com/oauth2.0/authorize",
        query: {
          client_id: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
          response_type: "code",
          redirect_uri: process.env.NEXT_PUBLIC_NAVER_CALLBACK_URL,
          state: "test", // redirect돼서 페이지 돌아왔을 때 받는 문자열, 로그인 후 되돌아갈 url 적으면 좋음
        },
      }}
    >
      <Image src="/login-naver.png" alt="login" width={200} height={50} />
    </Link>
  );
}
