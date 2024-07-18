"use client";


import { useState } from "react";
import { css } from "@/styled-system/css";
import LineEdit from "@/components/LineEdit";
import Button from "@/components/Button";


export default function Page() {
    const [lineEditText, setLineEditText] = useState("");
    const [buttonEnabled, setButtonEnabled] = useState(true);

    return (
        <div className={css({
            display: "flex",
            padding: "1em",
            flexDirection: "column",
            gap: "1em"
        })}>
            <p>테스트 영역</p>
            <div>
                <LineEdit text={lineEditText} onChange={(event) => setLineEditText(event.target.value)} />
            </div>
            <div className={css({
                display: "flex",
                gap: "1em"
            })}>
                <Button text={`옆에 있는 버튼을 ${buttonEnabled ? "비활성화" : "활성화"}`} onClick={(event) => setButtonEnabled(!buttonEnabled)}/>
                <Button text={buttonEnabled ? "활성화 상태" : "비활성화 상태"} disabled={!buttonEnabled} />
            </div>
        </div>
    );
}