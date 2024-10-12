"use client";

import { ProfileImage } from "@/components/ProfileImage";
import { useAccount } from "@/hook/useAccount";
import { useRouter } from "@/hook/useRouter";
import { css } from "@/styled-system/css";

export function Profile() {
  const account = useAccount();
  const router = useRouter();

  return (
    <div
      className={css({
        width: "2.45rem",
        height: "2.45rem",
        borderRadius: "50%",
        bg: "#fff",
        border: "2px solid #333",
        padding: "0.35rem",
        boxSizing: "border-box",
        cursor: "pointer",
        _hover: {
          borderColor: "secondary",
        },
      })}
      onClick={() => {
        router.push(account ? "/settings" : "/login");
      }}
    >
      <ProfileImage
        alt="profile"
        src={account? account.profileUrl : ""}
        width={25}
        height={25}
        className={css({ width: "100%", height: "100%" })}
      />
    </div>
  );
}
