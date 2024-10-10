import { apiClient } from "@/utils/axios";
import { toast } from "react-toastify";
import { TLEditorSnapshot } from "tldraw";

export const getSelfDrawFromServer = async (
  pageCount: number,
  sessionId: number,
  fileId: number
) => {
  const promises = [];
  for (let i = 0; i < pageCount; i++) {
    promises.push(
      apiClient.get<
        { data: { note: TLEditorSnapshot; width: number; height: number } }[]
      >(`/user/session/${sessionId}/file/${fileId}/note/${i}`)
    );
  }
  const results = await Promise.allSettled(promises);
  const finalResult: {
    note: TLEditorSnapshot | null;
    width: number;
    height: number;
  }[] = [];
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      finalResult.push({
        note: result.value.data[0] ? result.value.data[0].data.note : null,
        width: result.value.data[0] ? result.value.data[0].data.width : 0,
        height: result.value.data[0] ? result.value.data[0].data.height : 0,
      });
    } else {
      toast(
        `${index + 1}번째 페이지 데이터를 받아오는 중 오류가 발생했습니다.`,
        { type: "error" }
      );
      finalResult.push({ note: null, width: 0, height: 0 });
    }
  });
  return finalResult;
};
