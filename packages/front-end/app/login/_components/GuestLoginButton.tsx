import { css } from "@/styled-system/css";
import UsersIcon from "@/public/icons/users.svg";
import { apiClient } from "@/utils/axios";

const getUUID = () => {
    const existUUID = localStorage.getItem("catchup-guest-id")
    if (existUUID) {
        return existUUID
    }
    const newUUID = crypto.randomUUID()
    localStorage.setItem("catchup-guest-id", newUUID)
    return newUUID;
}

export const GuestLoginButton = () => {
  return (
    <button
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
      onClick={async ()=>{
        console.log("guest login")
        const guestID = getUUID();
        // await apiClient.post("/auth",{id:guestID})
      }}
    >
      <UsersIcon width={"30px"} height={"30px"} />
      게스트 로그인
    </button>
  );
};
