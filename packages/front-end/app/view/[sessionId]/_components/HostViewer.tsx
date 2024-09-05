"use client";

import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Session, File } from "@/schema/backend.schema";
import { apiClient } from "@/utils/axios";
import { useHostSocket } from "../_hooks/useHostSocket";
import { PainterInstanceGenerator, PDFPainter } from "@/PaintPDF/components";

interface SessionReturnType extends Session {
  fileList: File[];
}

export default function HostViewer({
  params,
}: {
  params: { sessionId: string; userId: number };
}) {
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery<AxiosResponse<SessionReturnType>>({
    queryKey: ["session", params.sessionId],
    queryFn: async () => {
      return await apiClient.get(`/session`, {
        params: { id: params.sessionId },
      });
    },
  });
  const data = response?.data;

  const store = useHostSocket(params.userId, params.sessionId);

  if (isLoading) {
    return <p>로딩...</p>;
  }
  if (isError || data?.fileList[0]?.url === undefined) {
    return <p>unable to load session: {params.sessionId}</p>;
  }

  return data !== undefined ? (
  
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      width: "100vw",
      height: "100vh",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <PDFPainter painterId={"Session123_File123"} pdfDocumentURL={data.fileList[0]?.url || ""}>
      <PainterInstanceGenerator instanceId={"Host"} readOnly={true}  />
      <PainterInstanceGenerator instanceId={"Guest"} readOnly={false} />
    </PDFPainter>
  </div>
    // <div
    //   className={css({
    //     width: "100%",
    //     height: "100%",
    //     overflowX: "hidden",
    //   })}
    // >
    //   <PDFViewer documentURL={data.fileList[0]?.url} />
    //   <div
    //     className={css({
    //       width: "100%",
    //       position: "absolute",
    //       inset: 0,
    //       zIndex: 50,
    //     })}
    //   >
    //     <Tldraw store={store} />
    //   </div>
    // </div>
  ) : (
    <></>
  );
}
