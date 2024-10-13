"use client"
import { useRouter } from "@/hook/useRouter";
import Link from "next/link";
import { forwardRef } from "react";
import { LinkPropsReal } from "@/type/PropTypes/LinkPropType";
import { css, cx } from "@/styled-system/css";

const SidebarLink = forwardRef<HTMLAnchorElement, LinkPropsReal>(
  function SidebarLink(props, ref) {
    const { pathname } = useRouter();

    return (
      <li
        className={cx(
          css({
            fontWeight: "medium",
            fontSize: "1rem",
            color: pathname === props.href ? "secondary" : "white",
            padding: "0.696rem 0",
            paddingLeft: "3.285rem",
            _hover: {
              color: "tertiary",
            },
          }),
          props.className
        )}
      >
        <Link {...props} ref={ref}>
          {props.children}
        </Link>
      </li>
    );
  }
);

export default SidebarLink;
