import Button from "@/components/Button";
import { css } from "@/styled-system/css";
import { useRef, useState, ChangeEvent } from "react";
import LineEdit from "@/components/LineEdit";
import { User } from "@/schema/backend.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/utils/axios";
import { Label } from "@/components/Label";
import { ProfileImage } from "@/components/ProfileImage";
import { useAccount } from "@/hook/useAccount";

const UserProfileSettings = () => {
  const account: User | null = useAccount();

  const fileInputRef = useRef<null | HTMLInputElement>(null);
  const formRef = useRef<null | HTMLFormElement>(null);
  const [imageSrc, setImageSrc] = useState<string>(account?.profileUrl || "");
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

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
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
        gap: "1rem",
        width: "800px",
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
        <Label htmlFor="profileImage">프로필 사진</Label>
        <div className={css({ display: "flex", gap: "1.5rem" })}>
          <ProfileImage
            src={imageSrc}
            alt="프로필 사진"
            width={50}
            height={50}
            className={css({ borderRadius: "50%", height: "50px" })}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            name="profileImage"
            id="profileImage"
            onChange={handleImageChange}
            hidden
          />
          <Button
            onClick={() => {
              if (fileInputRef.current !== null) {
                fileInputRef.current.click();
              }
            }}
            className={css({
              backgroundColor: "green.600",
              width: "200px",
              height: "50px",
            })}
          >
            수정하기
          </Button>
        </div>
        <Label htmlFor="nickname">닉네임</Label>
        <LineEdit
          placeholder="닉네임을 입력해 주세요."
          defaultValue={account?.nickname || ""}
          name="nickname"
          id="nickname"
          className={css({ height: "50px" })}
        />
      </div>
      <Button type="submit" className={css({ height: "50px" })}>
        저장하기
      </Button>
    </form>
  );
};

export default UserProfileSettings;
