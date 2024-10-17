import { css, cx } from "@/styled-system/css";
import { styled } from "@/styled-system/jsx";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

// interface PropType
//   extends DetailedHTMLProps<
//     InputHTMLAttributes<HTMLInputElement>,
//     HTMLInputElement
//   > {}

// export default function LineEdit({ className, ...attr }: PropType) {
//   return (
//     <input
//       {...attr}
//       type="text"
//       className={cx(
//         className,
//         css({
//           padding: "0.5em 0.8em",
//           color: "#000000",
//           background: "#ededed",
//           border: "2px solid transparent",
//           borderRadius: "0.4em",
//           outline: "none",
//           transition: "all 0.15s ease-in-out",
//           _hoverNotFocus: {
//             borderColor: "orange.300",
//             background: "#dcdcdc",
//           },
//           _focus: {
//             borderColor: "red.400",
//             background: "#eeeeee",
//           },
//         }),
//       )}
//     />
//   );
// }

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
