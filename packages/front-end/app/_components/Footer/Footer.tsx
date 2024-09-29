import { memo } from "react";
import { css } from "@/styled-system/css";
import FooterItem from "@/app/_components/Footer/FooterItem";
import LogoVariantIcon from "@/public/logo-variant.svg";
import { PROJECT_NAME } from "@/const/config";
import FooterGroup from "@/app/_components/Footer/FooterGroup";

const Footer = () => {
  return (
    <div
      className={css({
        display: "flex",
        padding: "1em",
        backgroundColor: "#222222",
        color: "#ffffff",
        alignItems: "start",
        gap: "1em",
      })}
    >
      <div
        className={css({
          padding: "1em",
          gap: "1em",
        })}
      >
        <div
          className={css({
            display: "flex",
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
        <div
          className={css({
            padding: "1em",
          })}
        >
          강의환경 동기화를 위한 솔루션
        </div>
      </div>
      <FooterGroup name="캐치업">
        <FooterItem href={"#"}>캐치업팀</FooterItem>
        <FooterItem href={"#"}>도움말</FooterItem>
        <FooterItem href={"#"}>문의하기</FooterItem>
        <FooterItem href={"/privacy-policy"} target={"_blank"}>
          개인정보 처리방침
        </FooterItem>
      </FooterGroup>
      <FooterGroup name="사용하기">
        <FooterItem href={"#"}>강의자료 업로드</FooterItem>
        <FooterItem href={"#"}>필기</FooterItem>
        <FooterItem href={"#"}>다운로드</FooterItem>
      </FooterGroup>
    </div>
  );
};

export default memo(Footer);
