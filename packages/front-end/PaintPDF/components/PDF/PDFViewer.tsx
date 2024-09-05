import { memo, useEffect, useRef } from "react";
import { PDFRenderer } from "./PDFRenderer";
import type { PDFViewerControllerHook } from "./types";
import { usePDFViewerController } from "./hooks/usePDFViewerController";

const PDFViewerComponent = ({ pdfDocumentURL, pdfViewerControllerHook }: { pdfDocumentURL: string; pdfViewerControllerHook?: PDFViewerControllerHook }) => {
	const pdfRendererElement = useRef<HTMLDivElement | null>(null);
	const defaultPdfViewerControllerHook = usePDFViewerController();
	const { pdfViewerController, onPdfDocumentChange, onPdfPageChange, onPdfItemClick, onPdfMouseMoveEvent, onPdfWheelEvent } =
		pdfViewerControllerHook || defaultPdfViewerControllerHook;

	useEffect(() => {
		if (pdfRendererElement.current) {
			const element = pdfRendererElement.current;
			element.addEventListener("mousemove", onPdfMouseMoveEvent);
			return () => element.removeEventListener("mousemove", onPdfMouseMoveEvent);
		}
	}, [onPdfMouseMoveEvent]);

	useEffect(() => {
		if (pdfRendererElement.current) {
			const element = pdfRendererElement.current;
			element.addEventListener("wheel", onPdfWheelEvent);
			return () => element.removeEventListener("wheel", onPdfWheelEvent);
		}
	}, [onPdfWheelEvent]);

	return (
		<div
			ref={pdfRendererElement}
			style={{
				cursor: pdfViewerController.isDragModeEnabled() ? "move" : "default",
			}}
		>
			<PDFRenderer
				pdfDocumentURL={pdfDocumentURL}
				pdfPageIndex={pdfViewerController.getPageIndex()}
				pdfRenderOptions={pdfViewerController.getRenderOptions()}
				pdfInteractionEnabled={!pdfViewerController.isDragModeEnabled()}
				pdfItemClickEnabled={pdfViewerController.isItemClickEnabled()}
				onPdfDocumentChange={onPdfDocumentChange}
				onPdfPageChange={onPdfPageChange}
				onPdfItemClick={onPdfItemClick}
			/>
		</div>
	);
};

export const PDFViewer = memo(PDFViewerComponent);
