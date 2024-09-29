import { memo } from "react";
import { css } from "@/styled-system/css";
import LinkButton from "@/components/LinkButton";

const Carousel = () => {
  return (
    <div
      className={css({
        display: "flex",
        backgroundColor: "#c0c0c0",
        justifyContent: "space-between",
      })}
    >
      <div
        className={css({
          display: "flex",
          padding: "2em",
          flexDirection: "column",
          gap: "1em",
        })}
      >
        <p
          className={css({
            fontSize: "1.5em",
            fontWeight: "bold",
          })}
        >
          텍스트 제목
        </p>
        <p>강의환경 동기화를 위한 솔루션</p>
        <LinkButton
          className={css({
            width: "13em",
          })}
          href={"/dashboard"}
        >
          대시보드로 이동
        </LinkButton>
      </div>
      <div
        className={css({
          paddingX: "2em",
        })}
      >
        <div
          className={css({
            padding: "1em",
            width: "20em",
            height: "100%",
            color: "#ffffff",
            backgroundColor: "#000000",
          })}
        >
          이미지 영역
        </div>
      </div>
    </div>
  );
};

export default memo(Carousel);
