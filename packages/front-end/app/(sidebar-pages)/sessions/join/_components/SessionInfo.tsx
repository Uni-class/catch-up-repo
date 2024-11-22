import { SessionResponseDto } from "@/schema/backend.schema";
import { css } from "@/styled-system/css";
import { apiClient } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { ReactNode } from "react";
import { Label } from "@/components/Label";
import { Paragraph } from "@/components/Text";
import Divider from "@/components/Divider";
import Button from "@/components/Button/Button";
import { useRouter } from "@/hook/useRouter";
import SessionIcon from "@/public/icons/session.svg";

interface PropType {
  sessionCode: string;
}

export const SessionInfo = ({ sessionCode }: PropType) => {
  const router = useRouter();
  const { data, isLoading, isError } = useQuery<
    AxiosResponse<SessionResponseDto>
  >({
    queryKey: ["session", "code", sessionCode],
    queryFn: async () => {
      return await apiClient.get("/session", {
        params: {
          code: sessionCode,
        },
      });
    },
  });
  const sessionData = data?.data;

  if (sessionData === undefined) {
    return <></>;
  }

  return (
    <>
      <Container labelText="세션 코드">
        <Paragraph>{sessionCode}</Paragraph>
      </Container>
      <Container labelText="세션 제목">
        <Paragraph>{sessionData.sessionName}</Paragraph>
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
        startIcon={<SessionIcon width={"1.5em"} height={"1.5em"} />}
        className={css({
          width: "100%",
          justifyContent:"center",
        })}
      >
        접속하기
      </Button>
    </>
  );
};

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
