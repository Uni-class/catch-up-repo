import Link from "next/link";
import { styled } from "@/styled-system/jsx";

const LinkButton = styled(Link, {
  base: {
    padding: "0.8em",
    color: "#ffffff",
    background: "blue.500",
    borderRadius: "0.5em",
    userSelect: "none",
    textAlign: "center",
    _hover: {
      background: "blue.600",
    },
    _active: {
      color: "#ffffff",
      background: "orange.400",
    },
  },
});

export default LinkButton;
