import { css } from "@/styled-system/css";

import NavBar from "@/app/_components/NavBar/NavBar";
import Footer from "@/app/_components/Footer/Footer";
import Carousel from "@/app/_components/Carousel";
import Image from "next/image";
import Link from "next/link";
import Banner from "./_components/Banner";
import Feature from "./_components/Feature";

export default function Page() {
  return (
    <>
      <div
        className={css({
          width: "100%",

          bg: "primary",
          color: "#fff",
          padding: "1rem 1.25rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        })}
      >
        <NavBar />
        <Banner />
        <Feature/>
      </div>
      <Footer />
    </>
  );
}
