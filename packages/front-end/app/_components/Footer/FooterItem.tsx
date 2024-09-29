import { HTMLAttributeAnchorTarget, memo, ReactNode } from "react";
import Link from "next/link";
import { css } from "@/styled-system/css";

const FooterItem = ({
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
        alignItems: "center",
        cursor: "pointer",
        borderRadius: "0.2em",
        _hoverNotActive: {
          backgroundColor: "#ffffff80",
        },
      })}
    >
      <Link
        className={css({
          width: "100%",
          height: "100%",
          padding: "0.8em 1em",
        })}
        href={href}
        target={target}
      >
        {children}
      </Link>
    </div>
  );
};

export default memo(FooterItem);
