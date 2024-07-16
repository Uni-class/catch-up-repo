import { css } from "@/styled-system/css";

function Tmp({ backgroundColor }: { backgroundColor: string }) {
  return <div className={css({ bg: backgroundColor })}></div>;
}

function Par() {
  return (
    <>
      <Tmp backgroundColor="#fff" />
      <Tmp backgroundColor="color.red.200" />
    </>
  );
}
