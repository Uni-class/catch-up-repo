import Button from "@/components/Button";
import FileUploadAndSelectModal from "@/components/FileUploadAndSelectModal";
import { Label } from "@/components/Label";
import LineEdit from "@/components/LineEdit";
import ModalContainer from "@/components/ModalContainer";
import { CreateSessionDto } from "@/schema/backend.schema";
import { css } from "@/styled-system/css";
import { apiClient } from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { overlay } from "overlay-kit";
import { ChangeEvent, useRef } from "react";

export default function SessionCreateForm() {
  const queryClient = useQueryClient();
  const formDataRef = useRef<CreateSessionDto>({
    sessionName: "",
    sessionFileIds: [],
  });
  const formMutation = useMutation({
    mutationFn: async (body: CreateSessionDto) =>
      await apiClient.post("/session", body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "sessions", "host"] });
    },
  });
  const handleFileButtonClick = () => {
    overlay.open(
      ({ isOpen, close }) => (
        <ModalContainer isOpen={isOpen} onClose={close}>
          <FileUploadAndSelectModal formDataRef={formDataRef} />
        </ModalContainer>
      ),
      { overlayId: "File-Select" },
    );
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    formDataRef.current.sessionName = e.target.value;
  };

  return (
    <form
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
        maxWidth: "50em",
      })}
      onSubmit={(e) => {
        e.preventDefault();
        formMutation.mutate(formDataRef.current);
      }}
    >
      <Label htmlFor="session title">세션 제목</Label>
      <LineEdit
        id="session title"
        name="session title"
        placeholder="세션 제목을 입력해주세요"
        onChange={handleInputChange}
        className={css({ height: "3em" })}
      />
      <Label htmlFor="select file">파일 선택</Label>
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          gap: "1em",
        })}
      >
        <div>
          {formDataRef.current.sessionFileIds.length === 0
            ? "파일이 선택되지 않았습니다."
            : formDataRef.current.sessionFileIds}
        </div>
        <Button
          id="select file"
          name="select file"
          type="button"
          onClick={handleFileButtonClick}
          className={css({
            height: "3em",
            backgroundColor: "green.600",
          })}
        >
          {formDataRef.current.sessionFileIds.length === 0
            ? "파일 선택"
            : "파일 변경"}
        </Button>
      </div>
      <Button type="submit" className={css({ height: "3em" })}>
        세션 시작
      </Button>
    </form>
  );
}
