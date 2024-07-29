"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Divider from "@/components/Divider";
import {Heading} from "@/components/Text";
import UserInfoEdit from "@/app/settings/_components/UserInfoEdit";

export default function Page() {
  return (
    <div>
      <Heading>설정</Heading>
      <Divider/>
      <div>
        <ErrorBoundary fallback={<h1>예기치 못한 오류가 발생하였습니다. [임시 컴포넌트]</h1>}>
          <Suspense fallback={<h1>불러오는 중... [임시 컴포넌트]</h1>}>
            <UserInfoEdit/>
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
