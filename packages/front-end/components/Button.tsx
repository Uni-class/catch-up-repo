import { styled } from "@/styled-system/jsx";


const Button = styled("button", {
    base: {
        padding: "0.8em",
        color: "#ffffff",
        background: "blue.500",
        outline: "none",
        borderRadius: "0.5em",
        transition: "all 0.2s ease-in-out",
        cursor: "pointer",
        _enabled: {
            _hover: {
                background: "blue.600",
            },
            _active: {
                color: "#ffffff",
                background: "orange.40",
            },
        },
        _disabled: {
            background: "red.400",
            cursor: "not-allowed",
        }
    }
});

export default Button;