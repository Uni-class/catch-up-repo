import { memo } from "react";
import { PDFPainterInstanceControllerHook } from "./types";


const PainterInstanceGeneratorComponent = ({
	instanceId,
	readOnly = false,
	customPdfPainterInstanceControllerHook,
}: {
	instanceId: string;
	readOnly?: boolean;
	customPdfPainterInstanceControllerHook?: PDFPainterInstanceControllerHook;
}) => {
	return (
		<div>
			<div>{instanceId}</div>
			<div>{readOnly}</div>
			<div>{String(customPdfPainterInstanceControllerHook)}</div>
		</div>
	);
};

export const PainterInstanceGenerator = memo(PainterInstanceGeneratorComponent);
