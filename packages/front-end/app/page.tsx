"use client";

import { css } from "@/styled-system/css";

import NavBar from "@/app/_components/NavBar/NavBar";
import Footer from "@/app/_components/Footer/Footer";
import Carousel from "@/app/_components/Carousel";

export default function Page() {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: "1em",
      })}
    >
      <NavBar />
      <div
        className={css({
          flex: 1,
        })}
      >
        <Carousel />
        <div
          className={css({
            padding: "1em",
          })}
        >
          <p
            className={css({
              marginBottom: "0.2em",
              fontSize: "1.5em",
            })}
          >
            CatchUP 특징
          </p>
          <p>CatchUP을 통해 강의 자료에 대한 쉽고 빠른 접근이 가능합니다.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
