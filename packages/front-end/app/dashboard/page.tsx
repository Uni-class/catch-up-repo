"use client";


import { css } from "@/styled-system/css";


export default function Page() {
    return (
        <div className={css({
            display: "flex",
            padding: "1em",
            flexDirection: "column",
            gap: "1em"
        })}>
            <p>대시보드 영역</p>
        </div>
    );
}