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

export type GetDrawType = ({
  sessionId,
  fileId,
  currentPageIndex,
}: {
  sessionId: number;
  fileId: number;
  currentPageIndex: number;
}) => Promise<{
  note: TLEditorSnapshot | null;
  width: number;
  height: number;
}>;

export const getUserDraw:GetDrawType = async ({
  sessionId,
  fileId,
  currentPageIndex,
}: {
  sessionId: number;
  fileId: number;
  currentPageIndex: number;
}) => {
  const { note, width, height } = await apiClient
    .get<
      {
        data: {
          note: TLEditorSnapshot | null;
          width: number;
          height: number;
        };
      }[]
    >(`/user/session/${sessionId}/file/${fileId}/note/${currentPageIndex}`)
    .then((res) => {
      console.log({ res }, "API RESULT");
      // res: data: {data:{}}[]
      return res.data[0]
        ? res.data[0]?.data
        : { note: null, width: 0, height: 0 };
    })
    .catch((error) => {
      toast(
        `필기를 불러오는 중 에러가 발생했어요.: ${error.response?.data?.message}`
      );
      return { note: null, width: 0, height: 0 };
    });
  return { note, width, height };
};

export const getHostDraw:GetDrawType = async ({
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
