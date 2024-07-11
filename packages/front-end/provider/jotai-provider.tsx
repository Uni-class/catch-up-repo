import { ReactNode } from "react";
import { Provider } from 'jotai'

interface PropType{
    children:ReactNode
}

export default function JotaiProvider({children}:PropType){
    return <Provider>{children}</Provider>
}