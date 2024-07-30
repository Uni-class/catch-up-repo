import { sessionAreCheckedAtom } from "@/client/CheckBoxAtom";
import Button from "@/components/Button";
import { Heading } from "@/components/Text";
import { css } from "@/styled-system/css";
import { getIsChecked } from "@/util/getIsChecked";
import { useAtom } from "jotai";

export default function SessionHeader() {
  const [areChecked] = useAtom(sessionAreCheckedAtom);
  const checkedData = getIsChecked(areChecked);
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
      <Heading variant="h4">
        내가 주최한 세션
      </Heading>
      <div className={css({ display: "flex", gap: "1rem" })}>
        <Button>
          새로운 세션 생성
        </Button>
        <Button onClick={handleDeleteButtonClick}>선택한 세션 삭제</Button>
      </div>
    </div>
  );
}
