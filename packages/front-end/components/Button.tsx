import { styled } from "@/styled-system/jsx";


const Button = styled("button", {
    base: {
        padding: "0.3em 0.7em",
        color: "#000000",
        background: "#ededed",
        outline: "none",
        transition: "all 0.2s ease-in-out",
        cursor: "pointer",
        _enabled: {
            _hover: {
                background: "#dcdcdc",
            },
            _active: {
                color: "#ffffff",
                background: "#a8a8a8",
            },
        },
        _disabled: {
            background: "#ffe4e4",
            cursor: "not-allowed",
        }
        }
});

export default Button;