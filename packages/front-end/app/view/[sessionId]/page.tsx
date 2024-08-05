"use client";


import PDFViewer from "@/components/DocumentViewer/PDF/PDFViewer";
import {useQuery} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Session, File } from "@/schema/backend.schema";
import { apiClient } from "@/utils/axios";
import { css } from "@/styled-system/css";


interface SessionReturnType extends Session {
  fileList: File[]
}


export default function Page({ params }: { params: { sessionId: string } }) {
  const { data: response, isLoading, isError } = useQuery<AxiosResponse<SessionReturnType>>({
    queryKey: ["session", params.sessionId],
    queryFn: async () => {
      return await apiClient.get(`/session/${params.sessionId}`);
    },
  });
  const data = response?.data;

  if (data === undefined) {
    return <p>unable to load session: {params.sessionId}</p>
  }
  const documentURL = data.fileList[0].url;

  return (
    <div className={css({
      width: "100%",
      height: "100%",
      overflowX: "hidden",
    })}>
      <PDFViewer documentURL={documentURL} />
    </div>
  );
}
