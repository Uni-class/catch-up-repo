import { Paragraph } from "@/components/Text";
import { css } from "@/styled-system/css";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

interface ElementPropType {
  text: string;
  href: Url;
}

function MenuElement({ text, href }: ElementPropType) {
  return (
    <ul
      className={css({
        "&:hover": {
          bg: "gray.100",
        },
      })}
    >
      <li>
        <Link
          href={href}
          className={css({
            width: "100%",
            //padding: "4px 0.25rem"
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
    <>
      <Paragraph variant="sub3">메뉴</Paragraph>
      <nav
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
          flexGrow: 1,
        })}
      >
        {elementProps.map(({ id, ...elementProp }) => {
          return <MenuElement key={id} {...elementProp} />;
        })}
      </nav>
    </>
  );
}
