import Button from "@/components/Button";
import { Paragraph } from "@/components/Text";
import { css } from "@/styled-system/css";
import Image from "next/image";
import { useRef, useState } from "react";
import LineEdit from "@/components/LineEdit";
import { User } from "@/schema/backend.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/utils/axios";

interface PropType {
  data: User;
}

export default function UserProfileEdit({ data }: PropType) {
  const fileInputRef = useRef<null | HTMLInputElement>(null);
  const formRef = useRef<null | HTMLFormElement>(null);
  const [imageSrc, setImageSrc] = useState<string>(
    data.profileUrl || "/icon/icon-google.svg"
  );
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


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
        <Paragraph>프로필 사진</Paragraph>
        <div className={css({ display: "flex", gap: "1.5rem" })}>
          <Image
            src={imageSrc}
            alt="프로필 사진"
            width={50}
            height={50}
            className={css({ borderRadius: "50%",height:"50px" })}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            name="profileImage"
            onChange={handleImageChange}
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
