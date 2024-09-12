"use client";

import { Heading } from "@/components/Text";
import HostSessionTableFetcher from "./_fetcher/HostSessionTableFetcher";
import Divider from "@/components/Divider";

export default function Page() {
  return (
    <>
      <Heading>내가 주최한 세션</Heading>
      <Divider />
      <HostSessionTableFetcher />
    </>
  );
}
