import Image from "next/image";
import { LoginButtonContainer } from "../_style/LoginButtonContainer";

import { ProviderEnum } from "@/app/login/_type/ProviderEnum";
import { ProviderData } from "@/app/login/_const/ProviderData";
import { useAccountController } from "@/hook/useAccount";

interface PropType {
  providerEnum: ProviderEnum;
}

export default function LoginButton({ providerEnum }: PropType) {
  const accountController = useAccountController();

  const providerData = ProviderData[providerEnum];
  const redirectURI = new URL(providerData.query.redirect_uri);
  redirectURI.searchParams.set(
    "continue",
    accountController.getContinueString(),
  );
  return (
    <LoginButtonContainer
      href={{
        pathname: providerData.pathname,
        query: {
          ...providerData.query,
          response_type: "code",
        },
      }}
      provider={providerEnum}
    >
      <Image
        alt={providerData.display.text}
        src={providerData.display.iconURL}
        width={30}
        height={30}
      />
      <p>{providerData.display.text}</p>
    </LoginButtonContainer>
  );
}
