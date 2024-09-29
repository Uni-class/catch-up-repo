import { HTMLAttributeAnchorTarget, memo, ReactNode } from "react";
import Link from "next/link";
import { css } from "@/styled-system/css";

const NavBarItem = ({
  children,
  href,
  target,
}: {
  children: ReactNode;
  href?: any;
  target?: HTMLAttributeAnchorTarget;
}) => {
  return (
    <div
      className={css({
        display: "flex",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        _hoverNotActive: {
          backgroundColor: "#ffffff80",
        },
      })}
    >
      <Link
        className={css({
          width: "100%",
          height: "100%",
          padding: "1em",
        })}
        href={href}
        target={target}
      >
        {children}
      </Link>
    </div>
  );
};

export default memo(NavBarItem);
