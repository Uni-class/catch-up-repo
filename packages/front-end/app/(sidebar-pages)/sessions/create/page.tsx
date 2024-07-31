"use client";

import { Heading } from "@/components/Text";
import Divider from "@/components/Divider";
import SessionCreateForm from "./_components/SessionCreateForm";

export default function Page() {
  return (
    <>
      <Heading>세션 생성</Heading>
      <Divider />
      <SessionCreateForm />
    </>
  );
}
