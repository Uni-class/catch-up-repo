import Image from "next/image";
import { LoginButtonContainer } from "../_style/login-button-container";
import { css } from "@/styled-system/css";

import { ProviderEnum } from "@/app/login/_type/ProviderEnum";
import { ProviderData } from "@/app/login/_const/ProviderData";


interface PropType {
  providerEnum: ProviderEnum
}


export default function LoginButton({ providerEnum }: PropType) {
  const providerData = ProviderData[providerEnum];
  return (
    <LoginButtonContainer
      href={{ pathname: providerData.pathname, query: { ...providerData.query, response_type: "code" } }}
      provider={providerEnum}
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
