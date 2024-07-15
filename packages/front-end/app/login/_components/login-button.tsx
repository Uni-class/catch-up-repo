import Image from "next/image";
import { LoginButtonContainer } from "../_style/login-button-container";
import { css } from "@/styled-system/css";

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
      <Image alt={text} src={iconURL} width={18} height={18} />
      <p
        className={css({
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        })}
      >
        {text}
      </p>
    </LoginButtonContainer>
  );
}
