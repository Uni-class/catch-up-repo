import { Paragraph } from "@/components/Text";
import { useRouter } from "@/hook/useRouter";
import { css, cx } from "@/styled-system/css";
import Link from "next/link";

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
          href={{ pathname: href, query: queryObj }}
          className={css({
            width: "100%",
            padding: "8px 4px",
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
    <>
      <Paragraph variant="sub3" className={css({ margin: "8px 0" })}>
        메뉴
      </Paragraph>
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
