import { apiClient } from "@/utils/axios";
import { toast } from "react-toastify";
import { TLEditorSnapshot } from "tldraw";

export const postDraw = async ({
  sessionId,
  fileId,
  currentPageIndex,
  note,
  width,
  height,
}: {
  sessionId: number;
  fileId: number;
  currentPageIndex: number;
  note: TLEditorSnapshot | null;
  width?: number;
  height?: number;
}) => {
  if (note === null || width === undefined || height === undefined) {
    return;
  }
  apiClient.post(
    `/user/session/${sessionId}/file/${fileId}/note/${currentPageIndex}`,
    { note, width, height }
  );
};

export const getUserDraw = async ({
  sessionId,
  fileId,
  currentPageIndex,
}: {
  sessionId: number;
  fileId: number;
  currentPageIndex: number;
}) => {
  const { note, width, height } = await apiClient
    .get<{
      note: TLEditorSnapshot | null;
      width: number;
      height: number;
    }>(`/user/session/${sessionId}/file/${fileId}/note/${currentPageIndex}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      toast(
        `필기를 불러오는 중 에러가 발생했어요.: ${error.response?.data?.message}`
      );
      return { note: null, width: 0, height: 0 };
    });
  return { note, width, height };
};

export const getHostDraw = async ({
  sessionId,
  fileId,
  currentPageIndex,
}: {
  sessionId: number;
  fileId: number;
  currentPageIndex: number;
}) => {
  return { note: null, width: 0, height: 0 };
};
