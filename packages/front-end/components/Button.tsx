import { styled } from "@/styled-system/jsx";


const Button = styled("button", {
    base: {
        padding: "0.8em",
        color: "#ffffff",
        outline: "none",
        borderRadius: "0.5em",
        cursor: "pointer",
        userSelect: "none",
        _disabled: {
            backgroundColor: "#aaaaaa80",
            cursor: "not-allowed",
        }
    },
    variants: {
        preset: {
            primary: {
                backgroundColor: "blue.500",
                _enabled: {
                    _hoverNotActive: {
                        backgroundColor: "blue.600",
                    },
                    _active: {
                        color: "#ffffff",
                        backgroundColor: "orange.400",
                    },
                },
            },
            secondary: {
                backgroundColor: "gray.400",
                _enabled: {
                    _hoverNotActive: {
                        backgroundColor: "gray.600",
                    },
                    _active: {
                        color: "#ffffff",
                        backgroundColor: "orange.400",
                    },
                },
            },
        },
    },
    defaultVariants: {
        preset: "primary",
    },
});

export default Button;