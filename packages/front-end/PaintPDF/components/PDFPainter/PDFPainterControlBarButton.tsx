import { memo } from "react";

const PDFPainterControlBarButtonComponent = ({ onClick, disabled, icon, alt }: { onClick?: () => void; disabled?: boolean; icon: string; alt: string }) => {
	return (
		<button
			style={{
				padding: "0.4em 0.8em",
				userSelect: "none",
			}}
			onClick={onClick}
			disabled={disabled}
		>
			<img
				style={{
					width: "1.6em",
					height: "1.6em",
				}}
				src={icon}
				alt={alt}
			/>
		</button>
	);
};

export const PDFPainterControlBarButton = memo(PDFPainterControlBarButtonComponent);
