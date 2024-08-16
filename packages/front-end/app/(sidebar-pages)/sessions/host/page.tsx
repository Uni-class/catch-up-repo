"use client";


import { Heading } from "@/components/Text";
import HostSessionTableFetcher from "./_fetcher/HostSessionTableFetcher";
import Divider from "@/components/Divider";

export default function Page() {
  return (
    <>
      <Heading>내가 주최한 세션</Heading>
      <Heading variant="sub5">표의 항목을 클릭하여 상세보기 & 수정</Heading>
      <Divider/>
      <HostSessionTableFetcher />
    </>
  );
}
