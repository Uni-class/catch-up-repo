import Image from "next/image";
import Link from "next/link";

export default function KaKaoLogin() {
  return (
    <Link
      href={{
        pathname: "https://kauth.kakao.com/oauth/authorize",
        query: {
          client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
          response_type: "code",
          redirect_uri: process.env.NEXT_PUBLIC_KAKAO_CALLBACK_URL,
        },
      }}
    >
      <Image src="/login-kakao.png" alt="login" width={200} height={50} />
    </Link>
  );
}
