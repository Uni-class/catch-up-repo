import { useRouter } from "@/hook/useRouter";
import SidebarBaseElement from "@/app/dashboard/_components/Sidebar/SidebarBaseElement";
import Link from "next/link";


export default function SidebarLink({name, href}: {name: string; href: string}) {
  const {queryObj,pathname} = useRouter();

  return (
    <Link href={{pathname: href, query: queryObj}}>
      <SidebarBaseElement active={pathname === href}>
        {name}
      </SidebarBaseElement>
    </Link>
  );
}
