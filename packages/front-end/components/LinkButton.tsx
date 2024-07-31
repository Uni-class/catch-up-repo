import { useRouter } from "@/hook/useRouter";
import Link from "next/link";
import { ReactNode } from "react";
import { css, cx } from "@/styled-system/css";


export default function SidebarLink({className, children, href, target}: {className?: string, children?: ReactNode, href?: string, target?: string}) {
  const { queryObj,pathname } = useRouter();

  return (
    <Link className={cx(className, css({
      base: {
        padding: "0.8em",
        color: "#ffffff",
        background: "blue.500",
        borderRadius: "0.5em",
        userSelect: "none",
        textAlign: "center",
        _hover: {
          background: "blue.600",
        },
        _active: {
          color: "#ffffff",
          background: "orange.400",
        }
      }
    }))} href={{pathname: href, query: queryObj}} target={target}>
      {children}
    </Link>
  );
}
