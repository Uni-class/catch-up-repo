import { styled } from "@/styled-system/jsx";

export const HeaderControlButton = styled("button",{
    base:{
        width:"1.92rem",
        height:"1.92rem",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        color:"white",
        _disabled:{
            bg:"secondary",
            color:"black",
        }
    }
})