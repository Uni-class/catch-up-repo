import { Paragraph } from "@/components/Text";
import { css } from "@/styled-system/css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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
  return (
    <ul
      className={css({
        "&:hover": {
          bg: "gray.100",
        },
        borderRadius: "8px",
      })}
    >
      <li>
        <Link
          href={{ pathname: href, query: queryParams }}
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
