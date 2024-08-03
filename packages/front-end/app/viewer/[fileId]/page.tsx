"use client";


import { Heading } from "@/components/Text";


export default function Page({ params }: { params: { fileId: string } }) {
  return (
    <div>
      <Heading>파일 뷰어를 구현할 화면</Heading>
      <Heading>불러올 파일 ID: {params.fileId}</Heading>
    </div>
  );
}
