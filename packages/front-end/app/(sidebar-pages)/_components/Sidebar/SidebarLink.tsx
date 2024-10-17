"use client";
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
        className={css({
          fontWeight: "medium",
          fontSize: "1rem",
          color: pathname === props.href ? "secondary.200" : "white",
          padding: "0.696rem 0",
          paddingLeft: "3.285rem",
        })}
      >
        <Link
          {...props}
          ref={ref}
          className={cx(
            css({
              _hover: {
                color: "tertiary.200",
              },
            }),
            props.className
          )}
        >
          {props.children}
        </Link>
      </li>
    );
  }
);

export default SidebarLink;
