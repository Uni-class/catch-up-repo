import Button from "@/components/Button";
import { Paragraph } from "@/components/Text";
import { css } from "@/styled-system/css";
import Image from "next/image";
import { useState } from "react";
import LineEdit from "@/components/LineEdit";


export default function UserProfileEdit(data: { displayName: string, profileImageURL: string | null }) {
  const [displayName, setDisplayName] = useState(data.displayName);

  return (
    <div className={css({
      display: "flex",
      flexDirection: "column",
      gap: "1em",
    })}>
      <div className={css({
        display: "flex",
        gap: "1em",
      })}>
        <div>
          <Paragraph>프로필 사진</Paragraph>
          <Image src={data.profileImageURL || ""} alt="프로필 사진"/>
        </div>
        <div>
          <Paragraph>닉네임</Paragraph>
          <LineEdit
            placeholder="닉네임을 입력해 주세요."
            text={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
          />
        </div>
      </div>
      <Button type="submit">저장하기</Button>
    </div>
  );
}
