import Button from "@/components/Button";
import { Heading } from "@/components/Text";
import { useRouter } from "@/hook/useRouter";
import { css } from "@/styled-system/css";

export default function UserModalTop() {
  const router = useRouter();
  return (
    <div
      className={css({
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      })}
    >
      <Heading>내 정보</Heading>
      <Button
        onClick={() => {
          router.back();
        }}
      >
        X
      </Button>
    </div>
  );
}
