import Button from "@/components/Button";
import ModalContainer from "@/components/ModalContainer";
import { Paragraph } from "@/components/Text";
import { css } from "@/styled-system/css";
import { overlay } from "overlay-kit";

import { CreateSessionDto, SessionResponseDto } from "@/schema/backend.schema";
import FileUploadAndSelectModal from "@/components/FileUploadAndSelectModal";
import { ChangeEvent, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/utils/axios";
import { useRouter } from "@/hook/useRouter";
import { Label } from "@/components/Label";
import LineEdit from "@/components/LineEdit";

interface PropType {
  sessionData: SessionResponseDto;
}

export default function HostSession({ sessionData }: PropType) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const formDataRef = useRef<CreateSessionDto>({
    sessionFileIds: [],
    sessionName: sessionData.sessionName,
  });
  const formMutation = useMutation({
    mutationFn: async (body: CreateSessionDto) =>
      await apiClient.patch(`/session/${sessionData.sessionId}`, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "sessions", "host"] });
      router.push(`/view/${sessionData.sessionId}`);
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
    formDataRef.current.sessionName = e.target.value;
  };
  return (
    <form
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "800px",
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
        placeholder="세션 제목 입력"
        defaultValue={formDataRef.current.sessionName}
        onChange={handleInputChange}
        className={css({ height: "50px" })}
      />
      <Label htmlFor="select file">강의 자료 선택</Label>
      <Button
        id="select file"
        name="select file"
        type="button"
        onClick={handleFileButtonClick}
        className={css({
          height: "50px",
          width: "200px",
          backgroundColor: "green.600",
        })}
      >
        자료 선택
      </Button>
      <Label>현재 선택한 파일</Label>
      {sessionData.fileList.map((file) => (
        <Paragraph key={file.fileId}>{file.name}</Paragraph>
      ))}
      <Button type="submit" className={css({ height: "50px" })}>
        세션 시작
      </Button>
    </form>
  );
}
