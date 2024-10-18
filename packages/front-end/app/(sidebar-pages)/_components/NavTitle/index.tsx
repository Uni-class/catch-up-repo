import { parsePathname, routeTitle } from "@/const/routeTitle";
import { useRouter } from "@/hook/useRouter";
import { css } from "@/styled-system/css";
import RouteArrowIcon from "@/public/icons/route-arrow.svg";

export default function NavTitle() {
  const router = useRouter();
  const pathname = parsePathname(router.pathname);
  return (
    <div
      className={css({
        padding: "0.9rem 0",
        color: "grey.500",
        display: "flex",
        alignItems: "center",
        fontSize: "0.75rem",
        gap: "0.35rem",
      })}
    >
      <RouteArrowIcon width={"0.8rem"} height={"0.8rem"} fill="grey.500" />
      <p>{`${routeTitle[pathname].group} :: ${routeTitle[pathname].name}`}</p>
    </div>
  );
}
