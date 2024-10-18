import Button from "@/components/Button/Button";
import { Label } from "@/components/Label";
import { Paragraph } from "@/components/Text";
import { useRouter } from "@/hook/useRouter";
import { SessionResponseDto } from "@/schema/backend.schema";
import { css } from "@/styled-system/css";
import { ReactNode } from "react";
import SessionIcon from "@/public/icons/session.svg";
import Divider from "@/components/Divider";

interface PropType {
  sessionData: SessionResponseDto;
}

export default function ParticipantSession({ sessionData }: PropType) {
  const router = useRouter();
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        width: "100%",
        maxWidth: "70em",
        padding: "3rem 4.16rem",
        alignItems: "flex-start",
      })}
    >
      <Container labelText="세션 제목">
        <Paragraph>
          {sessionData.sessionName}
        </Paragraph>
      </Container>
      <Container labelText="강의 자료">
        {sessionData.fileList.map((file) => (
          <Paragraph key={file.fileId}>{file.name}</Paragraph>
        ))}
      </Container>
      <Divider />
      <Button
        onClick={() => {
          router.push(
            router.getURLString("/view", { id: `${sessionData.sessionId}` })
          );
        }}
        startIcon={<SessionIcon width={"1em"} height={"1em"} />}
      >
        세션 참여
      </Button>
    </div>
  );
}

function Container({
  children,
  labelText,
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
      <Label className={css({ minWidth: "9em" })}>{labelText}</Label>
      {children}
    </div>
  );
}
