import { useRouter } from "@/hook/useRouter";
import SidebarBaseElement from "@/app/dashboard/_components/Sidebar/SidebarBaseElement";
import Link from "next/link";
import {ReactNode} from "react";


export default function SidebarLink({children, href}: {children?: ReactNode; href?: string}) {
  const {queryObj,pathname} = useRouter();

  return (
    <Link href={{pathname: href, query: queryObj}}>
      <SidebarBaseElement active={pathname === href}>
        {children}
      </SidebarBaseElement>
    </Link>
  );
}
