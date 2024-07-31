"use client";


import { Heading } from "@/components/Text";
import ParticipantSessionTableFetcher from "./_fetcher/ParticipantSessionTableFetcher";
import Divider from "@/components/Divider";

export default function Page() {
  return (
    <>
      <Heading>내가 참가한 세션</Heading>
      <Divider/>
      <ParticipantSessionTableFetcher />
    </>
  );
}
