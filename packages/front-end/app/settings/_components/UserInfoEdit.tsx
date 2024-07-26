import Button from "@/components/Button";
import { Heading, Paragraph } from "@/components/Text";
import { css } from "@/styled-system/css";
import { apiClient } from "@/util/axios";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import Image from "next/image";
import { ChangeEvent, useRef } from "react";

export default function UserInfoEdit() {
  const { data: response } = useSuspenseQuery<AxiosResponse<any>>({
    queryKey: ["user", "profile"],
    queryFn: async () => await apiClient.get("/user/profile"),
  });
  const data = response.data;
  const nicknameRef = useRef<string>();
  const handleNicknameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    nicknameRef.current = e.target.value;
  };
  return (
    <>
      <Heading variant="h5">내 정보 수정</Heading>
      <div
        className={css({
          display: "flex",
          justifyContent: "space-between",
        })}
      >
        <div>
          <Paragraph variant="sub3">아바타</Paragraph>
          <Image src={data.profileUrl} alt="profile image" />
        </div>
        <div>
          <Paragraph variant="sub3">닉네임</Paragraph>
          <input onChange={handleNicknameInputChange} />
        </div>
      </div>
      <Button type="submit">수정하기</Button>
    </>
  );
}
