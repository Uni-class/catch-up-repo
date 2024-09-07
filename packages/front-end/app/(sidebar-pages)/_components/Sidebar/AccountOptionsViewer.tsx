import SidebarBaseElement from "@/app/(sidebar-pages)/_components/Sidebar/SidebarBaseElement";
import { css } from "@/styled-system/css";
import { useState, useEffect, useRef } from "react";
import SidebarLink from "@/app/(sidebar-pages)/_components/Sidebar/SidebarLink";
import Divider from "@/components/Divider";
import SettingsIcon from "@/public/icons/settings.svg";
import LogoutIcon from "@/public/icons/log-out.svg";
import { Paragraph } from "@/components/Text";
import { ProfileImage } from "@/components/ProfileImage";
import { useAccount } from "@/hook/useAccount";

const AccountOptionsViewer = () => {
  const account = useAccount();

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!account) {
      return;
    }
    const handleClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [account]);

  if (!account) {
    return <div>Loading Skeleton UI</div>;
  }

  return (
    <div
      ref={menuRef}
      className={css({
        position: "relative",
        display: "inline-block",
      })}
    >
      <Paragraph variant="sub3">유저</Paragraph>
      <SidebarBaseElement active={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <ProfileImage
          src={account.profileUrl}
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
            alignSelf: "center",
          })}
        >
          {account.nickname}
        </p>
      </SidebarBaseElement>
      {isOpen ? (
        <div
          className={css({
            position: "absolute",
            bottom: "100%",
            left: "-0.3em",
            display: "flex",
            flexDirection: "column",
            margin: "0.5em 0",
            padding: "0.5em",
            width: "calc(100% + 0.6em)",
            backgroundColor: "#ffffff",
            border: "1px solid #0000001a",
            borderRadius: "0.5em",
            boxShadow: "0 10px 15px -3px #0000001a, 0 4px 6px -4px #0000001a",
            gap: "0.5em",
          })}
        >
          <SidebarLink
            href="/help"
            onClick={() => setIsOpen(false)}
            target="_blank"
          >
            도움말 / 문의하기
          </SidebarLink>
          <SidebarLink href="/settings" onClick={() => setIsOpen(false)}>
            <SettingsIcon width={"1.2em"} />
            설정
          </SidebarLink>
          <Divider
            className={css({
              margin: "unset",
            })}
          />
          <SidebarLink href="/logout">
            <LogoutIcon width={"1.2em"} />
            로그아웃
          </SidebarLink>
        </div>
      ) : null}
    </div>
  );
};

export default AccountOptionsViewer;
