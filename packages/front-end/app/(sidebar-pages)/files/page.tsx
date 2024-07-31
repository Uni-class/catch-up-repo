"use client";


import { Heading } from "@/components/Text";
import Divider from "@/components/Divider";
import FileTableFetcher from "./_fetcher/FileTableFetcher";


export default function Page() {
  return (
    <div>
      <Heading>드라이브</Heading>
      <Divider/>
      <FileTableFetcher />
    </div>
  );
}
