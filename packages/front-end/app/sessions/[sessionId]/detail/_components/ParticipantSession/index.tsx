import Button from "@/components/Button";
import { Heading, Paragraph } from "@/components/Text";
import { SessionResponseDto } from "@/schema/backend.schema";
import { css } from "@/styled-system/css";

interface PropType {
  sessionData: SessionResponseDto;
}

export default function ParticipantSession({ sessionData }: PropType) {
  return (
    <main
      className={css({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      })}
    >
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          width: "600px",
          gap: "1rem",
        })}
      >
        <Heading>세션 정보 및 작성</Heading>
        <Paragraph>세션 제목</Paragraph>
        <Paragraph>{sessionData.sessionName}</Paragraph>
        <Paragraph>현재 선택한 파일</Paragraph>
        {sessionData.fileList.map((file) => (
          <Paragraph key={file.fileId}>{file.name}</Paragraph>
        ))}
        <Paragraph>파일 제목 목록</Paragraph>
        <Button type="submit">세션 참여</Button>
      </div>
    </main>
  );
}
