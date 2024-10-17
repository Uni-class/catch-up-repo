import { css } from "@/styled-system/css";
import { styled } from "@/styled-system/jsx";
import Image from "next/image";

export function RecommendCard({
  right = false,
  text,
  index,
  src
}: {
  right?: boolean;
  text: string;
  index: number;
  src: string;
}) {
  return (
    <CardContainer right={right} style={{ gridColumn: right ? 2 : 1 }}>
      <p
        className={css({
          fontSize: "0.75rem",
          alignSelf: right ? "flex-end" : "flex-start",
        })}
      >
        CATCH UP | USE IT
        <span className={css({ color: "secondary.200" })}> 0{index}</span>
      </p>
      <div
        className={css({
          position: "relative",
          borderRadius: "50%",
          bg: "secondary.200",
          width: "3.75rem",
          height: "3.75rem",
          marginBottom: "1.41rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0.96rem",
          boxSizing: "border-box",
        })}
      >
        <Image
          src={src}
          alt="icon"
          width={24}
          height={24}
          className={css({ width: "100%", height: "100%" })}
        />
      </div>
      <p
        className={css({
          fontSize: "1.6rem",
          fontWeight: "bold",
          paddingLeft: right ? 0 : "1.1rem",
          paddingRight: right ? "1.1rem" : 0,
        })}
      >
        {text}
      </p>
    </CardContainer>
  );
}

const CardContainer = styled("div", {
  base: {
    borderRadius: "1.25rem 1.25rem 1.25rem 6.25rem",
    padding: "1.08rem 1.625rem 1.8rem 1.8rem",
    color: "white",
    backgroundColor: "#FFFFFF1A",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gridColumn: 1,
    transform: "translateY(-30%)",
    boxShadow: "5px 20px 5px rgba(0, 0, 0, 0.1)",
  },
  variants: {
    right: {
      true: {
        borderRadius: "1.25rem 1.25rem 6.25rem 1.25rem",
        padding: "1.08rem 1.8rem 1.8rem 1.625rem",
        alignItems: "flex-start",
        gridColumn: 2,
        transform: "translateY(0%)",
      },
    },
  },
});
