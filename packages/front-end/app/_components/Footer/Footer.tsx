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
        padding: "2.16rem 12.9rem",
        backgroundColor: "#101702",
        color: "#A1A4C3",
        alignItems: "start",
        gap: "1em",
        justifyContent: "space-between",
      })}
    >
      <div
        className={css({
          padding: "1em",
        })}
      >
        <div
          className={css({
            display: "flex",
            alignItems: "center",
            gap: "0.6em",
            color: "secondary.200",
            marginBottom: "0.86rem",
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
        <p>강의환경 동기화를 위한 솔루션</p>
      </div>
      <div
        className={css({ display: "flex", gap: "4rem", paddingTop: "1.7rem" })}
      >
        <FooterGroup name="캐치업">
          <FooterItem href={"#"}>캐치업팀</FooterItem>
          <FooterItem href={"#"}>도움말</FooterItem>
          <FooterItem href={"#"}>문의하기</FooterItem>
          <FooterItem href={"/privacy-policy"} target={"_blank"}>
            개인정보 처리방침
          </FooterItem>
        </FooterGroup>
        <FooterGroup name="사용하기">
          <FooterItem href={"sessions/create"}>세션 생성</FooterItem>
          <FooterItem href={"sessions/join"}>세션 참여</FooterItem>
          <FooterItem href={"files"}>강의 자료</FooterItem>
        </FooterGroup>
      </div>
    </div>
  );
};

export default memo(Footer);
