import { css } from "@/styled-system/css";
import { styled } from "@/styled-system/jsx";
import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <section
      className={css({
        padding: "0 12.9rem",
        width: "100%",
        position: "relative",
        marginTop: "3.2rem",
      })}
    >
      <div className={css({})}>
        <h2 className={css({ fontSize: "1.6rem", color: "secondary" })}>
          내 강의를 따라와봐!
        </h2>
        <h1 className={css({ fontSize: "7.5rem", fontWeight: "bold" })}>
          캐치업
        </h1>
        <h2 className={css({ fontSize: "1.4rem", fontWeight: "semibold" })}>
          강의 환경 동기화를 위한 솔루션
        </h2>
        <BannerLinkButton href="/sessions/create">세션 생성</BannerLinkButton>
        <BannerLinkButton
          href="/sessions/join"
          className={css({
            marginLeft: "1rem",
          })}
        >
          세션 접속
        </BannerLinkButton>
      </div>
      <Image
        src="/banner-image.png"
        alt="banner-image"
        width={1042} // 521
        height={478} // 239
        className={css({
          width: "50%",
          aspectRatio: 1042 / 478,
          position: "absolute",
          bottom: 0,
          right: "12.9rem",
        })}
      />
    </section>
  );
}

const BannerLinkButton = styled(Link, {
  base: {
    fontSize: "1rem",
    color: "black",
    bg: "secondary",
    padding: "0.5rem 0.83rem",
    display: "inline-block",
    fontWeight: "bold",
    margin: "1.46rem 0",
    borderRadius: "0.33rem",
  },
});
