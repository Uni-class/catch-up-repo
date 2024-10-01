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

import EditIcon from "@/public/icons/edit.svg";

const UserProfileSettings = () => {
  const account: User | null = useAccount();

  const fileInputRef = useRef<null | HTMLInputElement>(null);
  const formRef = useRef<null | HTMLFormElement>(null);
  const [imageSrc, setImageSrc] = useState<string>(account?.profileUrl || "");
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const formMutation = useMutation({
    mutationFn: async (body: FormData) =>
      await apiClient.patch("/user/profile", body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
      queryClient.refetchQueries({ queryKey: ["user", "profile"] });
    },
    onError: (e) => {
      setError(`프로필 저장 실패: ${e.message}`);
    },
  });

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.onerror = () => {
        if (reader.error) {
          setError(reader.error.message);
        }
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
        maxWidth: "50em",
        width: "100%",
      })}
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        if (formRef.current) {
          const formData = new FormData(formRef.current);
          const nickname = formData.get("nickname") as string;
          if (nickname.trim() === "") {
            setError("닉네임을 입력해주세요.");
            return;
          }
          formMutation.mutate(formData);
        }
      }}
    >
      <Label>프로필 수정</Label>
      <div
        className={css({
          display: "flex",
          gap: "1em",
        })}
      >
        <div
          className={css({
            position: "relative",
            width: "fit-content",
            height: "fit-content",
            cursor: "pointer",
            gap: "1.5rem",
            boxSizing: "content-box",
            border: "0.2em solid #000000",
            borderRadius: "1.5em",
            overflow: "hidden",
            _hover: {
              opacity: 0.5,
            },
          })}
          onClick={() => {
            if (fileInputRef.current !== null) {
              fileInputRef.current.click();
            }
          }}
        >
          <ProfileImage
            src={imageSrc}
            alt="프로필 사진"
            width={256}
            height={256}
            className={css({
              width: "5em",
              height: "5em",
            })}
          />
          <div
            className={css({
              position: "absolute",
              bottom: 0,
              right: 0,
              padding: "0.3em",
              width: "fit-content",
              height: "fit-content",
              color: "#ffffff",
              backgroundColor: "#fa8c0f",
              borderRadius: "1em 0 0 0",
            })}
          >
            <EditIcon width={"1.5em"} />
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            name="profileImage"
            onChange={handleImageChange}
            hidden
          />
        </div>
        <div>
          <Label
            className={css({
              display: "block",
              fontSize: "1em",
            })}
            htmlFor="nickname"
          >
            닉네임
          </Label>
          <LineEdit
            placeholder="사용할 닉네임을 입력하세요."
            defaultValue={account?.nickname || ""}
            name="nickname"
            className={css({ flex: 1, height: "3em" })}
            id="nickname"
          />
        </div>
      </div>

      <p
        className={css({
          height: "1rem",
          fontSize: "1rem",
          color: "red.500",
        })}
      >
        {error && error}
      </p>

      <Button type="submit" className={css({ height: "50px" })}>
        저장하기
      </Button>
    </form>
  );
};

export default UserProfileSettings;
