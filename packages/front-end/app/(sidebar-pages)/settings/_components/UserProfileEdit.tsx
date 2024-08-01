import Button from "@/components/Button";
import { Paragraph } from "@/components/Text";
import { css } from "@/styled-system/css";
import Image from "next/image";
import { useRef, useState } from "react";
import LineEdit from "@/components/LineEdit";
import { User } from "@/schema/backend.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/util/axios";

interface PropType {
  data: User;
}

export default function UserProfileEdit({ data }: PropType) {
  const fileInputRef = useRef<null | HTMLInputElement>(null);
  const formRef = useRef<null | HTMLFormElement>(null);
  const queryClient = useQueryClient();
  const formMutation = useMutation({
    mutationFn: async (body: FormData) =>
      await apiClient.patch("/user/profile", body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
      queryClient.refetchQueries({ queryKey: ["user", "profile"] });
    },
    onError: (e) => {
      console.error(e);
    },
  });

  return (
    <form
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "1em",
      })}
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        if (formRef.current) {
          const formData = new FormData(formRef.current);
          formData.append("email","temp@gmail.com");
          formMutation.mutate(formData);
        }
      }}
    >
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "1em",
        })}
      >
        <div className={css({ display: "flex", gap: "1.5rem" })}>
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
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            name="profileImage"
            hidden
          />
          <Button
            onClick={() => {
              if (fileInputRef.current !== null) {
                fileInputRef.current.click();
              }
            }}
          >
            수정하기
          </Button>
        </div>
        <div>
          <Paragraph>닉네임</Paragraph>
          <LineEdit
            placeholder="닉네임을 입력해 주세요."
            defaultValue={data.nickname}
            name="nickname"
          />
        </div>
      </div>
      <Button type="submit">저장하기</Button>
    </form>
  );
}
