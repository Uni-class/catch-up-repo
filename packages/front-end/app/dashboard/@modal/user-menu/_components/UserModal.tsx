"use client";

import Divider from "@/components/Divider";
import ModalContainer from "@/components/ModalContainer";
import { css } from "@/styled-system/css";
import UserModalTop from "./UserModalTop";

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
        <UserModalTop/>
        <Divider />

      </div>
    </ModalContainer>
  );
}
