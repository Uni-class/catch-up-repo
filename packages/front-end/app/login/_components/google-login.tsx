import Image from "next/image";
import Link from "next/link";

export default function GoogleLogin() {
  return (
    <Link
      href={{
        pathname: "https://accounts.google.com/o/oauth2/v2/auth",
        query: {
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          response_type: "code",
          redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL,
          scope: "email profile openid",
        },
      }}
    >
      <Image src="/login-google.png" alt="google" width={200} height={50} />
    </Link>
  );
}
