import Link from "next/link";
import { ReactNode } from "react";
import { css, cx } from "@/styled-system/css";
import { Url } from "next/dist/shared/lib/router/router";


export default function LinkButton({className, children, href, target}: {className?: string, children?: ReactNode, href: Url, target?: string}) {

  return (
    <Link className={cx(css({
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
    }), className)} href={href} target={target}>
      {children}
    </Link>
  );
}
