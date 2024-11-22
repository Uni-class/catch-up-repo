import { SessionResponseDto } from "@/schema/backend.schema";
import { css } from "@/styled-system/css";
import { apiClient } from "@/utils/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { ReactNode } from "react";
import { Label } from "@/components/Label";
import { Paragraph } from "@/components/Text";
import Divider from "@/components/Divider";
import Button from "@/components/Button/Button";
import { useRouter } from "@/hook/useRouter";
import SessionIcon from "@/public/icons/session.svg";
import CloseIcon from "@/public/icons/close.svg";
import PlaceholderLayout from "@/components/Placeholder/PlaceholderLayout";
import Placeholder from "@/components/Placeholder/Placeholder";

interface PropType {
  onClose: () => void;
  sessionCode: string;
}

export const SessionInfo = ({ sessionCode, onClose }: PropType) => {
  const router = useRouter();
  const queryClient = useQueryClient();
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
  const sessionData = data?.data as SessionResponseDto;

  if (isLoading) {
    return (
      <PlaceholderLayout width={"100%"} gap="1.5rem" type="vertical">
        <Placeholder width={"100%"} height={"1.5rem"} />
        <Placeholder width={"100%"} height={"1.5rem"} />
        <Divider />
        <Placeholder width={"100%"} height={"1.5rem"} />
      </PlaceholderLayout>
    );
  }

  if (isError) {
    return (
      <>
        <h1 className={css({ textAlign: "center" })}>오류가 발생했어요.</h1>
        <Button
          onClick={() => {
            queryClient.invalidateQueries({
              queryKey: ["session", "code", sessionCode],
              exact: true,
            });
          }}
        >
          재시도하기
        </Button>
        <Divider />
        <Button
          className={css({ width: "100%", justifyContent: "center" })}
          color="dangerous"
          startIcon={<CloseIcon width={"1.5em"} height={"1.5em"} />}
          onClick={() => {
            onClose();
          }}
        >
          닫기
        </Button>
      </>
    );
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
          justifyContent: "center",
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
