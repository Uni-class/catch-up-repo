import { css } from "@/styled-system/css";
import Image from "next/image";
import { ReactNode } from "react";

export default function RoleProfile({
  imageSrc,
  flexDirection,
  labelComponent,
  textData,
}: {
  imageSrc: string;
  flexDirection?: React.CSSProperties["flexDirection"];
  labelComponent?: ReactNode;
  textData: string[];
}) {
  return (
    <div
      className={css({
        position: "relative",
        zIndex: 1,
        padding: "4rem 0 0 0",
        display: "flex",
        flexDirection: flexDirection,
        alignItems: "center",
      })}
    >
      <div className={css({ position: "relative" })}>
        <Image
          src={imageSrc}
          width={417}
          height={482}
          alt="role"
          className={css({
            width: "17.375rem",
          })}
        />
        {labelComponent}
      </div>
      <ul
        className={css({
          backgroundColor: "#FFFFFF1A",
          color: "#fff",
          backdropFilter: "blur(20px)",
          borderRadius: "1rem",
          margin: "0 1rem",
          padding: "1.46rem 0.95rem",
          boxSizing: "border-box",
          flexGrow: 1,
        })}
      >
        {textData.map((e, i) => (
          <li
            key={i}
            className={css({
              fontWeight: "semibold",
              fontSize:"1.25rem",
              padding: "0.25rem 0",
              listStyleType: "disc",
              marginLeft:"0.95rem",
              "&::marker": {
                color: "secondary",
              },
            })}
          >
            {e}
          </li>
        ))}
      </ul>
    </div>
  );
}
