import { css } from "@/styled-system/css";

import NavBar from "@/app/_components/NavBar/NavBar";
import Footer from "@/app/_components/Footer/Footer";
import Banner from "./_components/Banner";
import Feature from "./_components/Feature";
import AdditionalFeature from "./_components/AdditionalFeature";
import Recommend from "./_components/Recommend";

export default function Page() {
  return (
    <>
      <main
        className={css({
          width: "100%",
          bg: "primary.200",
          display:"flex",
          justifyContent:"center",
        })}
      >
        <div
          className={css({
            width: "100%",
            maxWidth: "1600px",
            color: "#fff",
            padding: "1rem 1.25rem 6.3rem 1.25rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          })}
        >
          <NavBar />
          <Banner />
          <Feature />
          <AdditionalFeature />
          <Recommend />
        </div>
      </main>
      <Footer />
    </>
  );
}
