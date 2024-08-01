import Button from "@/components/Button";
import { Paragraph } from "@/components/Text";
import { css } from "@/styled-system/css";
import Image from "next/image";
import { useState } from "react";
import LineEdit from "@/components/LineEdit";
import { User } from "@/schema/backend.schema";

interface PropType {
  data: User;
}

export default function UserProfileEdit({ data }: PropType) {
  const [displayName, setDisplayName] = useState(data.nickname);

  return (
    <form
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "1em",
      })}
    >
      <div
        className={css({
          display: "flex",
          flexDirection:"column",
          gap: "1em",
        })}
      >
        <div className={css({display:"flex",gap:"1.5rem"})}>
          <div>
            <Paragraph>프로필 사진</Paragraph>
          <Image
            src={data.profileUrl || "/icon/icon-google.svg"}
            alt="프로필 사진"
            width={32}
            height={32}
            className={css({ borderRadius: "50%" })}
          />  
          </div>
          <Button>수정하기</Button>
        </div>
        <div>
          <Paragraph>닉네임</Paragraph>
          <LineEdit
            placeholder="닉네임을 입력해 주세요."
            onChange={(event) => setDisplayName(event.target.value)}
          />
        </div>
      </div>
      <Button type="submit">저장하기</Button>
    </form>
  );
}
