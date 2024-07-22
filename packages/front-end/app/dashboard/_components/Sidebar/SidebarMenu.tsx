import { Paragraph } from "@/components/Text";
import { css, cx } from "@/styled-system/css";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import SidebarMenuGroup from "./SidebarMenuGroup";


interface ElementPropType {
  text: string;
  href: string;
}

function MenuElement({ text, href }: ElementPropType) {
  const query = useSearchParams();
  const queryParams: { [key: string]: string } = {};
  query.forEach((value, key) => {
    queryParams[key] = value;
  });
  const pathname = usePathname();
  return (
    <ul
      className={cx(
        css({
          "&:hover": {
            bg: "gray.100",
          },
          borderRadius: "8px",
        }),
        pathname === href &&
          css({
            bg: "rose.100",
          })
      )}
    >
      <li>
        <Link
          href={{ pathname: href, query: queryParams }}
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
  { id: 0, text: "대쉬보드", href: "/dashboard" },
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
