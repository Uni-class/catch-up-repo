import { styled } from "@/styled-system/jsx";


const Button = styled("button", {
    base: {
        padding: "0.8em",
        color: "#ffffff",
        background: "blue.500",
        outline: "none",
        borderRadius: "0.5em",
        cursor: "pointer",
        userSelect: "none",
        _enabled: {
            _hover: {
                background: "blue.600",
            },
            _active: {
                color: "#ffffff",
                background: "orange.400",
            },
        },
        _disabled: {
            background: "gray.400",
            cursor: "not-allowed",
        }
    }
});

export default Button;