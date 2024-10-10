import { memo } from "react";
import { css } from "@/styled-system/css";
import NavBarItem from "@/app/_components/NavBar/NavBarItem";
import LogoVariantIcon from "@/public/logo-variant.svg";
import { PROJECT_NAME } from "@/const/config";
import LinkButton from "@/components/LinkButton";
import Link from "next/link";
import { useAccountController } from "@/hook/useAccount";
import { ProfileImage } from "@/components/ProfileImage";
import PlaceholderLayout from "@/components/Placeholder/PlaceholderLayout";
import Placeholder from "@/components/Placeholder/Placeholder";

const NavBar = () => {
  const accountController = useAccountController();

  return (
    <div
      className={css({
        display: "flex",
        backgroundColor: "#ce0000",
        color: "#ffffff",
        alignItems: "center",
      })}
    >
      <Link href={"/"}>
        <div
          className={css({
            display: "flex",
            paddingX: "1em",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.6em",
          })}
        >
          <LogoVariantIcon width={"3em"} height={"3em"} />
          <p
            className={css({
              fontSize: "1.5em",
              fontWeight: "bold",
            })}
          >
            {PROJECT_NAME}
          </p>
        </div>
      </Link>
      <NavBarItem href={"/dashboard"}>대시보드</NavBarItem>
      <div
        className={css({
          display: "flex",
          marginLeft: "auto",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        })}
      >
        {accountController.account ? (
          <div
            className={css({
              display: "flex",
              padding: "0 0.8em",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.6em",
              cursor: "pointer",
              _hoverNotActive: {
                backgroundColor: "#ffffff80",
              },
            })}
          >
            <ProfileImage
              src={accountController.account.profileUrl}
              width={32}
              height={32}
              alt="프로필 사진"
              className={css({
                borderRadius: "50%",
                width: "32px",
                height: "32px",
              })}
            />
            <p
              className={css({
                fontWeight: "bold",
              })}
            >
              {accountController.account.nickname}
            </p>
          </div>
        ) : accountController.isLoading ? (
          <PlaceholderLayout height={"100%"} padding={"0 0.8em"} gap={"0.6em"}>
            <Placeholder type={"circle"} width={"32px"} height={"32px"} />
            <Placeholder type={"text"} width={"6em"} />
          </PlaceholderLayout>
        ) : (
          <LinkButton
            className={css({
              display: "block",
              marginRight: "0.5em",
              paddingY: "0.4em",
            })}
            href={"/login"}
          >
            로그인
          </LinkButton>
        )}
      </div>
    </div>
  );
};

export default memo(NavBar);
