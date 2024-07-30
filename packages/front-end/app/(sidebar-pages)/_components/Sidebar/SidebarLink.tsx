import { useRouter } from "@/hook/useRouter";
import SidebarBaseElement from "@/app/(sidebar-pages)/_components/Sidebar/SidebarBaseElement";
import Link from "next/link";
import {ReactNode} from "react";


export default function SidebarLink({children, href, target, onClick}: {children?: ReactNode; href?: string, target?: string, onClick?: () => void}) {
  const {queryObj,pathname} = useRouter();

  return (
    <Link href={{pathname: href, query: queryObj}} target={target} onClick={onClick}>
      <SidebarBaseElement active={pathname === href}>
        {children}
      </SidebarBaseElement>
    </Link>
  );
}
