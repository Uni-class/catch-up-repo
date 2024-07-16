import Image from "next/image";
import { LoginButtonContainer } from "../_style/login-button-container";
import { css } from "@/styled-system/css";


type Provider = "GOOGLE" | "NAVER" | "KAKAO";

interface OAuth2Data {
  pathname: string;
  query: {
    client_id: string;
    redirect_uri: string;
    scope?: string;
    state?: string;
  }
  display: {
    text: string;
    iconURL: string;
  }
}

const ProviderData: {
  [key in Provider]: OAuth2Data
} = {
  "GOOGLE": {
    pathname: "https://accounts.google.com/o/oauth2/v2/auth",
    query: {
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL || "",
      scope: "email profile openid"
    },
    display: {
      text: "Google 로그인",
      iconURL: "/icon/icon-google.svg"
    }
  },
  "NAVER": {
    pathname: "https://nid.naver.com/oauth2.0/authorize",
    query: {
      client_id: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID || "",
      redirect_uri: process.env.NEXT_PUBLIC_NAVER_CALLBACK_URL || "",
      state: "HASH"
    },
    display: {
      text: "Naver 로그인",
      iconURL: "/icon/icon-naver.svg"
    }
  },
  "KAKAO": {
    pathname: "https://kauth.kakao.com/oauth/authorize",
    query: {
      client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || "",
      redirect_uri: process.env.NEXT_PUBLIC_KAKAO_CALLBACK_URL || ""
    },
    display: {
      text: "Kakao 로그인",
      iconURL: "/icon/icon-kakao.svg"
    }
  },
};



interface PropType {
  provider: Provider
}


export default function LoginButton({ provider }: PropType) {
  const providerData = ProviderData[provider];
  return (
    <LoginButtonContainer
      href={{ pathname: providerData.pathname, query: { ...providerData.query, response_type: "code" } }}
      provider={provider}
    >
      <Image alt={providerData.display.text} src={providerData.display.iconURL} width={18} height={18} />
      <p
        className={css({
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        })}
      >
        {providerData.display.text}
      </p>
    </LoginButtonContainer>
  );
}
