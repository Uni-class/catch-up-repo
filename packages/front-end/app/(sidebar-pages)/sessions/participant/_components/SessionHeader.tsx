import { sessionAreCheckedAtom } from "@/client/CheckBoxAtom";
import Button from "@/components/Button";
import { Heading } from "@/components/Text";
import { css } from "@/styled-system/css";
import { useAtom } from "jotai";

export default function SessionHeader() {
  const [areChecked, setAreChecked] = useAtom(sessionAreCheckedAtom);
  const checkedData = areChecked.filter((e) => e.checked).map((e) => e.id);
  const handleDeleteButtonClick = () => {
    console.log({ checkedData });
  };
  return (
    <div
      className={css({
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
      })}
    >
      <Heading>
        내가 참가한 세션
      </Heading>
      <div className={css({ display: "flex", gap: "1rem" })}>
        <Button>
          새로운 세션 참가
        </Button>
        <Button onClick={handleDeleteButtonClick}>선택한 세션 삭제</Button>
      </div>
    </div>
  );
}
