import Button from "@/components/Button/Button";
import { css } from "@/styled-system/css";
import { useRef, useState, ChangeEvent, ReactNode } from "react";
import LineEdit from "@/components/LineEdit";
import { User } from "@/schema/backend.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/utils/axios";
import { Label } from "@/components/Label";
import { ProfileImage } from "@/components/ProfileImage";
import { useAccount } from "@/hook/useAccount";
import CameraIcon from "@/public/icons/camera.svg";
import Divider from "@/components/Divider";
import ProfileIcon from "@/public/icons/profile.svg";

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
        gap: "1.25rem",
        width: "100%",
        maxWidth: "70em",
        padding: "3rem 4.16rem",
        alignItems: "flex-start",
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
      <div
        className={css({
          display: "flex",
          gap: "2em",
        })}
      >
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
          })}
        >
          <ProfileImage
            src={imageSrc}
            alt="프로필 사진"
            width={256}
            height={256}
            className={css({
              width: "7rem",
              height: "7rem",
              borderRadius: "50%",
              border: "1px solid",
              borderColor: "grey.100",
            })}
          />
          <Button
            onClick={() => {
              if (fileInputRef.current !== null) {
                fileInputRef.current.click();
              }
            }}
            color="gray"
            size="small"
            startIcon={<CameraIcon width={"1em"} height={"1em"} />}
            className={css({
              width: "100%",
            })}
          >
            <p className={css({ textAlign: "center", flex: 1, })}>사진 변경</p>
          </Button>
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
          <ControlContainer htmlFor="nickname" labelText="닉네임">
            <LineEdit
              placeholder="사용할 닉네임을 입력하세요."
              defaultValue={account?.nickname || ""}
              name="nickname"
              className={css({ flex: 1 })}
              id="nickname"
            />
          </ControlContainer>
        </div>
      </div>
      <Divider />
      <Button
        type="submit"
        startIcon={<ProfileIcon width={"1em"} height={"1em"} />}
      >
        저장하기
      </Button>
    </form>
  );
};

export default UserProfileSettings;

function ControlContainer({
  children,
  labelText,
  htmlFor,
  errorText,
  isError,
  height,
}: {
  children?: ReactNode;
  labelText?: string;
  htmlFor?: string;
  errorText?: string;
  isError?: boolean;
  height?: React.CSSProperties["height"];
}) {
  return (
    <div
      className={css({
        display: "flex",
        width: "100%",
        height: height,
        alignItems: "center",
      })}
    >
      <Label htmlFor={htmlFor} className={css({ minWidth: "5em" })}>
        {labelText}
      </Label>
      {children}
      {/* {!!isError && <p className={css({ color: "red.500" })}>{errorText}</p>} */}
    </div>
  );
}
