import Link from "next/link";
import Image from "next/image";
import { css } from "@/styled-system/css";
import { token } from "@/styled-system/tokens";
import { LoginButtonContainer } from "../_style/login-button-container";

interface PropType {
  pathname: string;
  query: {
    client_id: string | undefined;
    redirect_uri: string | undefined;
    state?: string | undefined;
    scope?: string | undefined;
  };
  text: string;
  iconURL: string;
  provider: "naver" | "kakao" | "google";
}

export default function LoginButton({
  pathname,
  query,
  text,
  iconURL,
  provider,
}: PropType) {
  return (
    <LoginButtonContainer
      href={{ pathname: pathname, query: { ...query, response_type: "code" } }}
      provider={provider}
    >
      <Image alt={text} src={iconURL} width={20} height={20} />
      {text}
    </LoginButtonContainer>
  );
}
