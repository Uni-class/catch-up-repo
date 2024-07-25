import { Paragraph } from "@/components/Text";
import { useRouter } from "@/hook/useRouter";
import { css, cx } from "@/styled-system/css";
import Link from "next/link";
import SidebarMenuGroup from "./SidebarMenuGroup";

interface ElementPropType {
  text: string;
  href: string;
}

function MenuElement({ text, href }: ElementPropType) {
  const {queryObj,pathname} = useRouter();
  return (
    <ul
      className={cx(
        css({
          borderRadius: "0.5em",
        }),
        css(
          pathname === href
          ?
          {
            color: "#ffffff",
            backgroundColor: "orange.400",
            fontWeight: "bold",
          }
          :
          {
            "&:hover": {
              backgroundColor: "gray.200",
            },
            "&:active": {
              color: "#ffffff",
              backgroundColor: "orange.300",
              fontWeight: "bold",
            }
          }
        )
      )}
    >
      <li>
        <Link
          href={{ pathname: href, query: queryObj }}
          className={css({
            width: "100%",
            padding: "0.8em",
            display: "inline-block",
          })}
        >
          <Paragraph variant="body3">{text}</Paragraph>
        </Link>
      </li>
    </ul>
  );
}

const elementProps: ({ id: number } & ElementPropType)[] = [
  { id: 0, text: "대시보드", href: "/dashboard" },
  { id: 1, text: "세션", href: "/dashboard/session" },
  { id: 2, text: "드라이브", href: "/dashboard/drive" },
];

export default function SidebarMenu() {
  return (
    <SidebarMenuGroup name="메뉴" className={css({
        height: "100%",
    })}>
      <nav
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "0.4rem",
          flexGrow: 1,
        })}
      >
        {elementProps.map(({ id, ...elementProp }) => {
          return <MenuElement key={id} {...elementProp} />;
        })}
      </nav>
    </SidebarMenuGroup>
  );
}
