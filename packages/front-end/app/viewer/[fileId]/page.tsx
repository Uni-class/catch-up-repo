"use client";

import "@/utils/pdfWorkerPolyfill";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { File } from "@/schema/backend.schema";
import { apiClient } from "@/utils/axios";
import PDFViewer from "@/components/DocumentViewer/PDF/PDFViewer";


export default function Page({ params }: { params: { fileId: string } }) {
  const { data: response, isLoading, isError } = useQuery<AxiosResponse<File>>({
    queryKey: ["file", params.fileId],
    queryFn: async () => {
      return await apiClient.get(`/file/${params.fileId}`);
    },
  });
  const data = response?.data;
  console.log(data);

  if (data === undefined) {
    return <p>unable to load file: {params.fileId}</p>
  }
  const documentURL = data.url;

  return (
    <div>
      <PDFViewer documentURL={documentURL} />
    </div>
  );
}
