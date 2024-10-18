"use client";

import { Heading } from "@/components/Text";
import Divider from "@/components/Divider";
import { css } from "@/styled-system/css";
import { SessionFormTemplate } from "../_components/SessionFormTemplate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormData } from "@/hook/useFormData";
import { SessionFormType } from "@/type/SessionFormType";
import { CreateSessionDto, Session } from "@/schema/backend.schema";
import { apiClient } from "@/utils/axios";
import { useRouter } from "@/hook/useRouter";
import { AxiosResponse } from "axios";
import { routeTitle } from "@/const/routeTitle";

export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const useFormDataResult = useFormData<SessionFormType>({
    sessionName: "",
    sessionFiles: [],
  });
  const { unControlledDataRef } = useFormDataResult;
  const formMutation = useMutation({
    mutationFn: async (body: CreateSessionDto) =>
      await apiClient.post("/session", body),
    onSuccess: (data:AxiosResponse<Session>) => {
      queryClient.invalidateQueries({ queryKey: ["user", "sessions", "host"] });
      router.push(router.getURLString("/view",{id:`${data.data.sessionId}`}))
    },
  });
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        height: "100%",
      })}
    >
      <h1
        className={css({
          fontSize: "1.5rem",
          fontWeight: "semibold",
          color: "black",
        })}
      >
        {routeTitle[router.pathname].name}
      </h1>
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
        
          flexGrow: 1,
        })}
      >
        <SessionFormTemplate
          formMutation={formMutation}
          useFormDataResult={useFormDataResult}
        />
      </div>
    </div>
  );
}
