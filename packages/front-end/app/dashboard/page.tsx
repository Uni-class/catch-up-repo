"use client";


import { useState } from "react";
import LineEdit from "@/components/LineEdit";


export default function Page(){
    const [lineEditText, setLineEditText] = useState("");


    return (
        <div>
            <p>테스트 영역</p>
            <div>
                <LineEdit text={lineEditText} onChange={(event) => setLineEditText(event.target.value)} />
            </div>
        </div>
    );
}