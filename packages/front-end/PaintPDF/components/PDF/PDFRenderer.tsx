import { memo } from "react";
import { BasePDFRenderer } from "./BasePDFRenderer";
import type { PDFDocument, PDFPage, PDFItemClickHandlerArguments, PDFRenderOptions } from "./types";

import "./PDFRenderer.css";

const PDFRendererComponent = ({
	pdfDocumentURL,
	pdfPageIndex = 0,
	pdfRenderOptions = {
		width: 0,
		height: 0,
		baseX: 0,
		baseY: 0,
		scale: 1,
	},
	pdfInteractionEnabled = true,
	pdfItemClickEnabled = true,
	onPdfDocumentChange = () => {},
	onPdfPageChange = () => {},
	onPdfItemClick = () => {},
}: {
	pdfDocumentURL: string;
	pdfPageIndex?: number;
	pdfRenderOptions?: PDFRenderOptions;
	pdfInteractionEnabled?: boolean;
	pdfItemClickEnabled?: boolean;
	onPdfDocumentChange?: (pdfDocument: PDFDocument | null) => void;
	onPdfPageChange?: (pdfPage: PDFPage | null) => void;
	onPdfItemClick?: ({ pageIndex, destination }: PDFItemClickHandlerArguments) => void;
}) => {
	return (
		<div
			style={{
				width: pdfRenderOptions.width,
				height: pdfRenderOptions.height,
				overflow: "hidden",
				userSelect: pdfInteractionEnabled ? "unset" : "none",
				pointerEvents: pdfInteractionEnabled ? "unset" : "none",
				["--annotation-pointer-events" as any]: pdfInteractionEnabled && pdfItemClickEnabled ? "auto" : "none",
			}}
		>
			<div
				style={{
					transform: `translate(${-pdfRenderOptions.baseX * pdfRenderOptions.scale}px, ${-pdfRenderOptions.baseY * pdfRenderOptions.scale}px)`,
				}}
			>
				<BasePDFRenderer
					pdfDocumentURL={pdfDocumentURL}
					pdfPageIndex={pdfPageIndex}
					pdfRenderWidth={pdfRenderOptions.width}
					pdfRenderHeight={pdfRenderOptions.height}
					pdfRenderScale={pdfRenderOptions.scale}
					onPdfDocumentChange={onPdfDocumentChange}
					onPdfPageChange={onPdfPageChange}
					onPdfItemClick={onPdfItemClick}
				/>
			</div>
		</div>
	);
};

export const PDFRenderer = memo(PDFRendererComponent);
