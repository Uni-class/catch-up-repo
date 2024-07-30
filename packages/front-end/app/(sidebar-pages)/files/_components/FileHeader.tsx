import Button from "@/components/Button";
import ModalContainer from "@/components/ModalContainer";
import { Heading } from "@/components/Text";
import { css } from "@/styled-system/css";
import { overlay } from "overlay-kit";
import FileUploadModal from "./FileUploadModal";
import { fileAreCheckedAtom } from "@/client/CheckBoxAtom";
import { useAtom } from "jotai";
import { getIsChecked } from "@/util/getIsChecked";

export default function FileHeader() {
  const [areChecked] = useAtom(fileAreCheckedAtom);

  const handleUploadButtonClick = () => {
    overlay.open(
      ({ isOpen, close }) => (
        <ModalContainer isOpen={isOpen} onClose={close}>
          <FileUploadModal />
        </ModalContainer>
      ),
      { overlayId: "file upload" }
    );
  };
  return (
    <div
      className={css({
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
      })}
    >
      <Heading variant="h4">내가 업로드한 파일</Heading>
      <div className={css({ display: "flex", gap: "1rem" })}>
        <Button onClick={handleUploadButtonClick}>새 파일 업로드</Button>
        <Button
          onClick={() => {
            console.log(
              getIsChecked(areChecked)
            );
          }}
        >
          선택한 파일 삭제
        </Button>
      </div>
    </div>
  );
}
