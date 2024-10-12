import { css } from "@/styled-system/css";
import { RecommendCard } from "./RecommendCard";

const recommendData: { text: string; src: string }[] = [
  { text: "학생의 강의 몰입도를 높이고 싶은 강의자", src: "/icons/recommend-instructor.svg" },
  { text: "강의 자료에 자유롭게 필기하고 저장하고 싶은 누구나", src:  "/icons/recommend-drawer.svg" },
  { text: "자신의 필기를 간편하게 공유하고 싶은 누구나", src:  "/icons/recommend-share.svg" },
  { text: "더 효율적인 스터디와 발표를 함께 만들어가는 구성원", src:  "/icons/recommend-study.svg" },
];

export default function Recommend() {
  return (
    <section
      className={css({
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridAutoRows: "auto",
        gap: "4.16rem 3.3rem",
        width: "100%",
        boxSizing: "border-box",
        padding: "0 12.9rem",
        marginTop: "3.38rem",
      })}
    >
      <div className={css({ gridColumn: 2 })} style={{ gridColumn: 2 }}>
        <h2
          className={css({
            fontSize: "2rem",
            fontWeight: "bold",
            padding: "1rem 0",
            maxWidth: "100%",
          })}
        >
          이런분께 추천합니다!
        </h2>
        <p>
          캐치업은 학생의 강의 몰입도를 높이고, 강의 자료에 자유롭게 필기하고
          저장하며, 자신의 필기를 간편하게 공유하고, 더 효율적인 스터디와 발표를
          함께 만들어가는 구성원을 위한 서비스입니다.
        </p>
      </div>
      {recommendData.map((e, i) => (
        <RecommendCard
          right={i % 2 === 1}
          text={e.text}
          index={i + 1}
          src={e.src}
          key={i}
        />
      ))}
    </section>
  );
}
