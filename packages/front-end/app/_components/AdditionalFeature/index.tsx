import { css } from "@/styled-system/css";
import Hero from "./Hero";
import RoleProfile from "./RoleProfile";

export default function AdditionalFeature() {
  return (
    <section
      className={css({
        padding: "0 4.54rem",
        width: "100%",
        boxSizing: "border-box",
        marginTop: "4.54rem",
      })}
    >
      <div className={css({ position: "relative" })}>
        <Hero>INSTRUCTOR</Hero>
        <RoleProfile
          imageSrc="/image/role-instructor.png"
          textData={[
            "수강자가 보고 있는 페이지분포 하이라이트 팝업 기능",
            "자신의 필기 수강생에게 실시간 공유하는 기능",
            "메모장과 그림판 기능을 켜 각 페이지별로 필기하는 기능",
          ]}
        />
      </div>
      <div className={css({ position: "relative" })}>
        <Hero className={css({ right: 0 })}>STUDENT</Hero>
        <RoleProfile
          imageSrc="/image/role-student.png"
          flexDirection="row-reverse"
          textData={[
            "교수자가 진행중인 페이지 추적 및 하이라이트 팝업 기능",
            "교수자 필기 및 자신의 필기보기를 선택적으로 ON/OFF 기능",
            "교수자 필기, 자신의 필기, 원본 자료 선택적으로 적용해 다운로드 기능",
            "메모장과 그림판 기능을 켜 각 페이지별로 필기하는 기능",
          ]}
        />
      </div>
    </section>
  );
}
