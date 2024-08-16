import Button from "@/components/Button";
import { Label } from "@/components/Label";
import { Heading, Paragraph } from "@/components/Text";
import { useRouter } from "@/hook/useRouter";
import { SessionResponseDto } from "@/schema/backend.schema";
import { css } from "@/styled-system/css";

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
        gap: "1rem",
        width: "800px",
      })}
    >
      <Label>세션 제목</Label>
      <Paragraph className={css({ height: "50px" })}>
        {sessionData.sessionName}
      </Paragraph>
      <Label>현재 선택한 파일</Label>
      {sessionData.fileList.map((file) => (
        <Paragraph key={file.fileId}>{file.name}</Paragraph>
      ))}
      <Button className={css({ height: "50px" })}           onClick={() => {
            router.push(`/view/${sessionData.sessionId}`);
          }}>
        세션 참여
      </Button>
    </div>
  );
}