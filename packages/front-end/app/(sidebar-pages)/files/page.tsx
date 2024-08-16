"use client";


import { Heading } from "@/components/Text";
import Divider from "@/components/Divider";
import FileTableFetcher from "./_fetcher/FileTableFetcher";


export default function Page() {
  return (
    <div>
      <Heading>드라이브</Heading>
      <Heading variant="sub5">내가 업로드한 파일, 표의 항목을 클릭하면 미리보기</Heading>
      <Divider/>
      <FileTableFetcher />
    </div>
  );
}
