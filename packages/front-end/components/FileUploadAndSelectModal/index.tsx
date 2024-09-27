import { css, cx } from "@/styled-system/css";
import { overlay } from "overlay-kit";
import {
  createContext,
  DetailedHTMLProps,
  HTMLAttributes,
  MouseEventHandler,
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { Heading } from "../Text";
import Button from "../Button";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import FileUploader from "@/components/FileUploader/FileUploader";
import DriveFileUploadFetch from "./DriveFileSelect";
import { SessionFormType } from "@/type/SessionFormType";
import { UseFormDataResultType } from "@/hook/useFormData";

type TabDataType = "내 컴퓨터" | "기존 업로드 파일";
const tabData: TabDataType[] = ["내 컴퓨터", "기존 업로드 파일"];

interface PropType {
  useFormDataResult: UseFormDataResultType<SessionFormType>;
}

export const FileFormDataContext = createContext<
  UseFormDataResultType<SessionFormType>
>({} as UseFormDataResultType<SessionFormType>);

export default function FileUploadAndSelectModal({
  useFormDataResult,
}: PropType) {
  const [tabState, setTabState] = useState<TabDataType>("기존 업로드 파일");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"ready" | "uploading" | "finished">(
    "ready",
  );
  const fileUploaderRef = useRef<{
    upload: () => void;
  }>();
  const { reset } = useQueryErrorResetBoundary();

  return (
    <div
      className={css({
        width: "80vw",
        maxWidth: "60em",
        height: "80vh",
        backgroundColor: "#fff",
        borderRadius: "1rem",
        padding: "1em",
        display: "flex",
        flexDirection: "column",
      })}
    >
      <div
        className={css({
          display: "flex",
          justifyContent: "space-between",
        })}
      >
        <Heading>파일 선택</Heading>
      </div>
      <TabContainer>
        {tabData.map((e) => (
          <Tab
            key={e}
            text={e}
            state={e === tabState}
            disabled={status === "uploading"}
            onClick={() => {
              if (status === "finished") {
                setStatus("ready");
                setSelectedFiles([]);
              }
              setTabState(e);
            }}
          />
        ))}
      </TabContainer>
      {tabState === "내 컴퓨터" ? (
        <FileUploader
          accept={{
            "application/pdf": [".pdf"],
          }}
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
        />
      ) : (
        <FileFormDataContext.Provider value={useFormDataResult}>
          <ErrorBoundary fallback={<h1>에러</h1>} onReset={reset}>
            <DriveFileUploadFetch />
          </ErrorBoundary>
        </FileFormDataContext.Provider>
      )}
    </div>
  );
}

function TabContainer({ children }: { children: ReactNode }) {
  return <div className={css({ display: "flex" })}>{children}</div>;
}

interface TabPropType
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  state: boolean;
  text: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const selectStyle = css({
  color: "#000",
  borderBottomColor: "rose.400",
});

const unSelectStyle = css({
  color: "gray.400",
  borderBottomColor: "gray.100",
});

function Tab({ state, text, disabled = false, onClick, ...attr }: TabPropType) {
  return (
    <div
      className={cx(
        css({
          padding: "0.75rem 1.25rem",
          borderBottom: "1px solid",
          transition: "border-bottom-color 0.3s, color 0.3s",
          cursor: "pointer",
        }),
        state ? selectStyle : unSelectStyle,
        disabled
          ? css({
              color: "gray.400",
              borderBottomColor: "gray.100",
              cursor: "not-allowed",
            })
          : null,
      )}
      onClick={(event) => {
        if (disabled || !onClick) return;
        onClick(event);
      }}
      {...attr}
    >
      {text}
    </div>
  );
}
