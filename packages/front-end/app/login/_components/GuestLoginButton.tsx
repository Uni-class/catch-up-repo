import { css } from "@/styled-system/css"
import Image from "next/image"
import UsersIcon from "@/public/icons/users.svg"

export const GuestLoginButton = () => {
    return <button
        className={css({
            cursor: "pointer",
            backgroundColor: "grey.300",
            color: "black",
            display: "flex",
            padding: "1.5rem 1rem",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            fontSize: "1.2em",
            fontWeight: "bold",
            borderRadius: "6px",
            boxSizing: "border-box",
            _hover: {
                backgroundColor: "gray.400",
            },
        })}
    >
        <UsersIcon width={"30px"} height={"30px"}/>
        게스트 로그인
    </button>
}