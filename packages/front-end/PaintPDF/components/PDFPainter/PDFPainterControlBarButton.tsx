import { memo, ReactNode } from "react";

const PDFPainterControlBarButtonComponent = ({
  onClick,
  disabled,
  children,
}: {
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
}) => {
  return (
    <button
      style={{
        padding: "0.4em 0.8em",
        userSelect: "none",
        color: "#000000",
        backgroundColor: "#ffffff",
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const PDFPainterControlBarButton = memo(
  PDFPainterControlBarButtonComponent,
);
