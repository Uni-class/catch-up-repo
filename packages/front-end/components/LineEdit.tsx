import { styled } from "@/styled-system/jsx";


const LineEdit = styled("input", {
  base: {
    padding: "0.48rem 0.375rem",
    color: "black",
    bg: "grey.50",
    border: "1px solid",
    borderColor: "grey.100",
    borderRadius: "0.375rem",
    _hover: {
      borderColor: "primary.50",
    },
    _focus: {
      borderColor: "primary.200",
    }
  }
})

export default LineEdit
