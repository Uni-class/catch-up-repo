import { css } from "@/styled-system/css";
import Image from "next/image";
import { ReactNode } from "react";

export default function Feature() {
  return (
    <section
      className={css({
        padding: "0 10rem",
        width: "100%",
      })}
    >
      <div
        className={css({
          borderRadius: "60px",
          backgroundColor: "#fff",
          width: "100%",
          color: "black",
          padding: "2.3rem 3.3rem 5rem 3.3rem",
        })}
      >
        <h2
          className={css({
            textAlign: "center",
            marginBottom: "3rem",
            fontSize: "1.6rem",
            fontWeight: "bold",
          })}
        >
          캐치업 핵심 기능
        </h2>
        <div
          className={css({
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "3rem 0",
          })}
        >
          {featureData.map((feature, index) => (
            <FeatureElement
              key={index}
              index={index + 1}
              text={feature.text}
              footer={feature.footer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ElementPropType {
  index: number;
  text: string;
  footer?: ReactNode;
}

const featureData: Omit<ElementPropType, "index">[] = [
  {
    text: "강의자료 및 필기 저장",
    footer: (
      <Image
        src="/image/save-feature.png"
        alt="save-feature"
        width={306}
        height={150}
        className={css({
          boxSizing: "border-box",
          padding: "0 3rem",
          width: "100%",
          position: "absolute",
          right: 0,
          bottom: 0,
          transform: "translateY(50%)",
        })}
      />
    ),
  },
  {
    text: "실시간으로 공유되는 강의자의 시점과 필기",
    footer: (
      <div
        className={css({
          position: "relative",
          backgroundColor: "#C9C9C9",
          height: "1rem",
          marginTop: "1.5rem",
          borderRadius: "1000px",
        })}
      >
        <div
          className={css({
            position: "absolute",
            bg: "primary",
            width: "26%",
            height: "100%",
            borderRadius: "1000px",
          })}
        />
        <div
          className={css({
            position: "absolute",
            left: "calc(26% - 1rem)",
            top: "-50%",
            borderRadius: "50%",
            width: "2rem",
            height: "2rem",
            bg: "secondary",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          })}
        >
          <Image
            src="/icons/share.svg"
            width={30}
            height={30}
            alt="icon"
            className={css({
              width: "1rem",
              height: "1rem",
            })}
          />
        </div>
      </div>
    ),
  },
  {
    text: "강의자료, 내 필기, 그리고 강의자 필기의 독립적 관리 및 다운로드",
    footer: (
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "4rem",
          marginTop: "13px",
        })}
      >
        <div
          className={css({
            width: "4rem",
            height: "4rem",
            bg: "secondary",
            borderRadius: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          })}
        >
          <Image
            src="/icons/note-download.svg"
            width={36}
            height={36}
            alt="icon"
          />
        </div>
      </div>
    ),
  },
];

function FeatureElement({ index, text, footer }: ElementPropType) {
  return (
    <div
      className={css({
        borderRadius: "30px",
        backgroundColor: "#F4F4F4",
        width: "266px",
        height: "191px",
        padding: "1.6rem 2.5rem 2.625rem 2.5rem",
        textAlign: "center",
        position: "relative",
      })}
    >
      <p
        className={css({
          color: "primary",
          fontSize: "0.83rem",
          fontWeight: "bold",
        })}
      >{`핵심기능 0${index}`}</p>
      <p
        className={css({
          marginTop: "0.875rem",
          fontSize: "1.25rem",
          fontWeight: "bold",
        })}
      >
        {text}
      </p>
      {footer}
    </div>
  );
}
