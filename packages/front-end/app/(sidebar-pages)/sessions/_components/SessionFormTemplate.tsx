import Button from "@/components/Button";
import FileUploadAndSelectModal from "@/components/FileUploadAndSelectModal";
import { Label } from "@/components/Label";
import LineEdit from "@/components/LineEdit";
import ModalContainer from "@/components/ModalContainer";
import { Paragraph } from "@/components/Text";
import { UseFormDataResultType } from "@/hook/useFormData";
import { CreateSessionDto } from "@/schema/backend.schema";
import { css } from "@/styled-system/css";
import { SessionFormType } from "@/type/SessionFormType";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { overlay } from "overlay-kit";

export function SessionFormTemplate({
  useFormDataResult,
  formMutation,
}: {
  useFormDataResult: UseFormDataResultType<SessionFormType>;
  formMutation: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    CreateSessionDto,
    unknown
  >;
}) {
  const { unControlledDataRef, controlledData,idRef } = useFormDataResult;
  const handleFileButtonClick = () => {
    overlay.open(
      ({ isOpen, close }) => (
        <ModalContainer isOpen={isOpen} onClose={close}>
          <FileUploadAndSelectModal useFormDataResult={useFormDataResult} />
        </ModalContainer>
      ),
      { overlayId: `File-Select-${idRef.current}` }
    );
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    unControlledDataRef.current.sessionName = e.target.value;
  };

  return (
    <form
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "2em",
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
      <Label htmlFor="session-title">세션 제목</Label>
      <LineEdit
        id="session-title"
        name="session-title"
        placeholder="세션 제목을 입력해주세요"
        onChange={handleInputChange}
        className={css({ height: "3em" })}
        defaultValue={unControlledDataRef.current.sessionName}
      />
      <Label htmlFor="select-file">강의 자료 선택</Label>
      <Button
        id="select-file"
        name="select-file"
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
      <Paragraph>
        {controlledData.sessionFiles.length > 0
          ? controlledData.sessionFiles[0].name
          : "현재 선택한 파일이 없습니다."}
      </Paragraph>
      <Button type="submit" className={css({ height: "3em" })}>
        세션 시작
      </Button>
    </form>
  );
}
