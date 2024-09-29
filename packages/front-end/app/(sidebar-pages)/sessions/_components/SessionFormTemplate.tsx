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
import { ReactNode, useState } from "react";

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
  const { unControlledDataRef, controlledData, idRef } = useFormDataResult;
  const [error, setError] = useState({
    sessionName: false,
    sessionFiles: false,
  });
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
        const { sessionName, sessionFiles } = unControlledDataRef.current;
        const submitError = { sessionFiles: false, sessionName: false };
        if (!sessionName.trim()) {
          submitError.sessionName = true;
        }
        if (sessionFiles.length === 0) {
          submitError.sessionFiles = true;
        }
        if (submitError.sessionFiles || submitError.sessionName) {
          setError({ ...submitError });
          return;
        }
        formMutation.mutate({
          sessionName: sessionName,
          sessionFileIds: sessionFiles.map((file) => file.fileId),
        });
      }}
    >
      <ControlContainer
        labelText="세션 제목"
        htmlFor="session-title"
        errorText="세션 제목을 입력해주세요."
        isError={error.sessionName}
      >
        <LineEdit
          id="session-title"
          name="session-title"
          placeholder="세션 제목을 입력해주세요"
          onChange={handleInputChange}
          className={css({ height: "3em" })}
          defaultValue={unControlledDataRef.current.sessionName}
        />
      </ControlContainer>
      <ControlContainer
        labelText="강의 자료 선택"
        htmlFor="select-file"
        errorText="세션 파일을 선택해주세요."
        isError={error.sessionFiles}
      >
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
      </ControlContainer>
      <ControlContainer labelText="현재 선택한 파일" height="auto">
        <Paragraph>
          {controlledData.sessionFiles.length > 0
            ? controlledData.sessionFiles[0].name
            : "현재 선택한 파일이 없습니다."}
        </Paragraph>
      </ControlContainer>
      <Button type="submit" className={css({ height: "3em" })}>
        세션 시작
      </Button>
    </form>
  );
}

function ControlContainer({
  children,
  labelText,
  htmlFor,
  errorText,
  isError,
  height="135px",
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
        flexDirection: "column",
        gap: "0.75rem",
        width: "100%",
        height: height,
      })}
    >
      <Label htmlFor={htmlFor}>{labelText}</Label>
      {children}
      {!!isError && <p className={css({ color: "red.500" })}>{errorText}</p>}
    </div>
  );
}
