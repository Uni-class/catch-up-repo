import { sessionAreCheckedAtom } from "@/client/CheckBoxAtom";
import Button from "@/components/Button";
import { Heading } from "@/components/Text";
import { useRouter } from "@/hook/useRouter";
import { css } from "@/styled-system/css";
import { useAtom } from "jotai";

export default function SessionHeader() {
  const { queryObj } = useRouter();
  if (!queryObj["role"]) {
    queryObj["role"] = "participant";
  }
  const [areChecked, setAreChecked] = useAtom(sessionAreCheckedAtom);
  const checkedData = areChecked.filter((e) => e.checked).map((e) => e.id);
  const handleDeleteButtonClick = () => {
    console.log({ checkedData });
  };
  return (
    <div
      className={css({
        padding: "1.5rem 0",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
      })}
    >
      <Heading variant="h4">
        {queryObj["role"] === "participant"
          ? "내가 참가한 세션"
          : "내가 진행한 세션"}
      </Heading>
      <div className={css({ display: "flex", gap: "1rem" })}>
        <Button>
          {queryObj["role"] === "participant"
            ? "새로운 세션 참가"
            : "새로운 세션 생성"}
        </Button>
        <Button onClick={handleDeleteButtonClick}>선택한 세션 삭제</Button>
      </div>
    </div>
  );
}
