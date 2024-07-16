import { defineGlobalStyles } from "@pandacss/dev";

export const globalCss = defineGlobalStyles({

    "h1":{
        fontWeight:1000,
        fontSize:"2.5rem",
    },
    "h2":{
        fontWeight:800,
        fontSize:"2rem",
    },
    "h3":{
        fontWeight:600,
        fontSize:"1.5rem",
    },
    "button":{
        cursor:"pointer",
    },

    "img": {
        userSelect: "none",
        pointerEvents: "none",
    }

});