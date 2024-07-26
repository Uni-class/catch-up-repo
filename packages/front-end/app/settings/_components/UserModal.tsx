"use client";

import Divider from "@/components/Divider";
import ModalContainer from "@/components/ModalContainer";
import { css } from "@/styled-system/css";
import UserModalTop from "./UserModalTop";
import { Heading } from "@/components/Text";
import Button from "@/components/Button";
import UserInfoEdit from "./UserInfoEdit";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function UserModal() {
  return (
    <ModalContainer>
      <div
        className={css({
          backgroundColor: "white",
          borderRadius: "1rem",
          border: "1px solid",
          borderColor: "gray.100",
          padding: "1.5rem 1rem",
          width: "600px",
        })}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <UserModalTop />
        <Divider />
        <div>
          <ErrorBoundary fallback={<h1>에러</h1>}>
            <Suspense fallback={<h1>로딩</h1>}>
              <UserInfoEdit />
            </Suspense>
          </ErrorBoundary>
          <Heading variant="h5">로그아웃</Heading>
          <Button>로그아웃</Button>
        </div>
      </div>
    </ModalContainer>
  );
}
