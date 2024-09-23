import Button from "@/components/Button";
import FileUploadAndSelectModal from "@/components/FileUploadAndSelectModal";
import { Label } from "@/components/Label";
import LineEdit from "@/components/LineEdit";
import ModalContainer from "@/components/ModalContainer";
import { Paragraph } from "@/components/Text";
import { useFormData } from "@/hook/useFormdata";
import { CreateSessionDto, File } from "@/schema/backend.schema";
import { css } from "@/styled-system/css";
import { apiClient } from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { overlay } from "overlay-kit";
import { ChangeEvent } from "react";

export default function SessionCreateForm() {
  const queryClient = useQueryClient();
  const { unControlledDataRef, controlledData, setControlledData } =
    useFormData<{
      sessionName: string;
      sessionFiles: File[];
    }>({
      sessionName: "",
      sessionFiles: [],
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
      { overlayId: "File-Select" }
    );
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    unControlledDataRef.current.sessionName = e.target.value;
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
        formMutation.mutate({
          sessionName: unControlledDataRef.current.sessionName,
          sessionFileIds: unControlledDataRef.current.sessionFiles.map(
            (file) => file.fileId
          ),
        });
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
      <Label htmlFor="select file">강의 자료 선택</Label>
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
        자료 선택
      </Button>
      <Label>현재 선택한 파일</Label>
      <Paragraph>선택한 파일이 없습니다.</Paragraph>
      <Button type="submit" className={css({ height: "3em" })}>
        세션 시작
      </Button>
    </form>
  );
}
