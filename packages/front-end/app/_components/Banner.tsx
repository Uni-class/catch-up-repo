import { css } from "@/styled-system/css";
import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <div
      className={css({
        padding: "0 12.9rem",
        width: "100%",
        position: "relative",
        marginTop: "3.2rem",
        height: "239px",
      })}
    >
      <Image
        src="/banner-image.png"
        alt="banner-image"
        width={1042} // 521
        height={478} // 239
        className={css({
          width: "521px",
          height: "239px",
          position: "absolute",
          right: "12.9rem",
        })}
      />

      <h2>내 강의를 따라와봐!</h2>
      <h1>캐치업</h1>
      <h2>강의 환경 동기화를 위한 솔루션</h2>
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
}
