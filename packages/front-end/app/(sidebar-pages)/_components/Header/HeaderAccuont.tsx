"use client";
import Divider from "@/components/Divider";
import { ProfileImage } from "@/components/ProfileImage";
import { useAccount } from "@/hook/useAccount";
import { useRouter } from "@/hook/useRouter";
import { css } from "@/styled-system/css";
import Link from "next/link";

export function HeaderAccount() {
  const account = useAccount();
  const router = useRouter();
  return (
    <div
      className={css({ display: "flex", alignItems: "center", gap: "0.5rem" })}
    >
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          cursor: "pointer",
          _hover: {
            color: "primary.light",
          },
        })}
        onClick={() => {
          router.push("/settings");
        }}
      >
        <ProfileImage
          alt={"Profile"}
          src={account ? account.profileUrl : ""}
          width={21.32}
          height={21.32}
          className={css({
            width: "1.8rem",
            height: "1.8rem",
            borderRadius: "50%",
            border: "1px solid #EDEDED",
          })}
        />
        <p className={css({ fontSize: "1.125rem", fontWeight: "semibold" })}>
          {account?.nickname}
        </p>
      </div>
      <Divider direction="vertical" />
      <Link
        href="/logout"
        className={css({
          color: "#666",
          fontSize: "0.9rem",
          _hover: {
            color: "primary.light",
          },
        })}
      >
        Log out
      </Link>
    </div>
  );
}
