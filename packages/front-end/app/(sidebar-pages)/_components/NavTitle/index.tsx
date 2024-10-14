import { routeTitle } from "@/const/routeTitle";
import { useRouter } from "@/hook/useRouter";
import { css } from "@/styled-system/css";
import RouteArrowIcon from "@/public/icons/route-arrow.svg";

export default function NavTitle() {
  const router = useRouter();
  const pathname = router.pathname;
  return (
    <div
      className={css({
        padding: "0.9rem 0",
        color: "#8084AA",
        display: "flex",
        alignItems: "center",
        fontSize: "0.75rem",
        gap: "0.35rem",
      })}
    >
      <RouteArrowIcon width={"0.8rem"} height={"0.8rem"} fill="#8084AA" />
      <p>{`${routeTitle[pathname].group} :: ${routeTitle[pathname].name}`}</p>
    </div>
  );
}
