"use client";


import { Heading } from "@/components/Text";
import ParticipantSessionTableFetcher from "./_fetcher/ParticipantSessionTableFetcher";
import Divider from "@/components/Divider";

export default function Page() {
  return (
    <>
      <Heading>내가 참가한 세션</Heading>
      <Heading variant="sub5">표의 항목을 클릭하여 상세보기</Heading>
      <Divider/>
      <ParticipantSessionTableFetcher />
    </>
  );
}
