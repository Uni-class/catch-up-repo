import { memo, ReactNode } from "react";

const PDFPainterControlBarButtonComponent = ({ onClick, disabled, icon, alt }: { onClick?: () => void; disabled?: boolean; icon: ReactNode; alt: string }) => {
	return (
		<button
			style={{
				padding: "0.4em 0.8em",
				userSelect: "none",
			}}
			onClick={onClick}
			disabled={disabled}
		>
			{icon}
		</button>
	);
};

export const PDFPainterControlBarButton = memo(PDFPainterControlBarButtonComponent);
