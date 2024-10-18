"use client";

import { Heading } from "@/components/Text";
import HostSessionTableFetcher from "./_fetcher/HostSessionTableFetcher";
import Divider from "@/components/Divider";

export default function Page() {
  return (
    <>

      <HostSessionTableFetcher />
    </>
  );
}
