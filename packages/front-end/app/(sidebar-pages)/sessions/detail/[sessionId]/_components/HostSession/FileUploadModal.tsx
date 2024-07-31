import { Heading } from "@/components/Text";
import { css, cx } from "@/styled-system/css";
import { DetailedHTMLProps, HTMLAttributes, ReactNode, useState } from "react";
import DriveFileUploadFetch from "./DriveFileUpload";
import Button from "@/components/Button";
import { overlay } from "overlay-kit";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import LocalFileUpload from "@/components/FileUploader";

type TabDataType = "내 컴퓨터" | "기존 업로드 파일";
const tabData: TabDataType[] = ["내 컴퓨터", "기존 업로드 파일"];

export default function FileUploadModal() {
  const [tabState, setTabState] = useState<TabDataType>("내 컴퓨터");
  const { reset } = useQueryErrorResetBoundary();
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
