import { css } from "@/styled-system/css";
import SidebarGroup from "@/app/(sidebar-pages)/_components/Sidebar/SidebarGroup";
import SidebarLink from "./SidebarLink";
import CastIcon from "@/public/icons/cast.svg";
import DatabaseIcon from "@/public/icons/database.svg";
import { TopLogo } from "./TopLogo";
import { routeTitle } from "@/const/routeTitle";

const sessionsHrefs: string[] = [
  "/sessions/participant",
  "/sessions/host",
  "/sessions/create",
  "/sessions/join",
];
const driveHrefs: string[] = ["/files"];
export default function Sidebar() {
  return (
    <aside
      className={css({
        width: "15.15rem",
        height: "100%",
        borderRight: "1px solid",
        borderColor: "gray.200",
        bg: "primary.light",
        color: "white",
        float: "left",
      })}
    >
      <TopLogo />
      <SidebarGroup
        name="Sessions"
        icon={<CastIcon width={"0.8125rem"} height={"0.8125rem"} />}
      >
        {sessionsHrefs.map((e, i) => (
          <SidebarLink href={e} key={i}>
            {routeTitle[e].name}
          </SidebarLink>
        ))}
      </SidebarGroup>
      <SidebarGroup
        name="Drive"
        icon={<DatabaseIcon width={"0.8125rem"} height={"0.8125rem"} />}
      >
        {driveHrefs.map((e, i) => (
          <SidebarLink href={e} key={i}>
            {routeTitle[e].name}
          </SidebarLink>
        ))}
      </SidebarGroup>
    </aside>
  );
}
