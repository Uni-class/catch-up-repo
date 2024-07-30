import { css, cx } from "@/styled-system/css";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { overlay } from "overlay-kit";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  MutableRefObject,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Heading } from "../Text";
import Button from "../Button";
import LocalFileUpload from "../LocalFileUpload";
import { ErrorBoundary } from "react-error-boundary";
import DriveFileUploadFetch from "./DriveFileUpload";
import { useAtom } from "jotai";
import { currentFormDataAtom } from "@/client/FileSelectAtom";
import { CreateSessionDto } from "@/schema/backend.schema";

type TabDataType = "내 컴퓨터" | "기존 업로드 파일";
const tabData: TabDataType[] = ["내 컴퓨터", "기존 업로드 파일"];

interface PropType {
  formData: MutableRefObject<CreateSessionDto>;
}

export default function FileUploadAndSelectModal({ formData }: PropType) {
  const [tabState, setTabState] = useState<TabDataType>("내 컴퓨터");
  const { reset } = useQueryErrorResetBoundary();
  const [_currentFormData, setCurrentFormData] =
    useAtom<MutableRefObject<CreateSessionDto>>(currentFormDataAtom);
  useEffect(() => {
    setCurrentFormData(formData);
  }, []);
  return (
    <div
      className={css({
        width: "700px",
        height: "500px",
        backgroundColor: "#fff",
        borderRadius: "1rem",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
      })}
    >
      <div
        className={css({ display: "flex", justifyContent: "space-between" })}
      >
        <Heading>강의 자료 업로드 및 수정</Heading>
        <Button
          onClick={() => {
            overlay.close("file upload");
          }}
        >
          X
        </Button>
      </div>

      <TabContainer>
        {tabData.map((e) => (
          <Tab
            key={e}
            text={e}
            state={e === tabState}
            onClick={() => {
              setTabState(e);
            }}
          />
        ))}
      </TabContainer>
      {tabState === "내 컴퓨터" ? (
        <LocalFileUpload />
      ) : (
        <ErrorBoundary fallback={<h1>에러</h1>} onReset={reset}>
          <DriveFileUploadFetch />
        </ErrorBoundary>
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
}

const selectStyle = css({
  color: "#000",
  borderBottomColor: "rose.400",
});

const unSelectStyle = css({
  color: "gray.400",
  borderBottomColor: "gray.100",
});

function Tab({ state, text, ...attr }: TabPropType) {
  return (
    <div
      className={cx(
        css({
          padding: "0.75rem 1.25rem",
          borderBottom: "1px solid",
          transition: "border-bottom-color 0.3s, color 0.3s",
          cursor: "pointer",
        }),
        state ? selectStyle : unSelectStyle
      )}
      {...attr}
    >
      {text}
    </div>
  );
}
