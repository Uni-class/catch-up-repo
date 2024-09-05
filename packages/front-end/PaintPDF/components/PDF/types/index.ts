import { pdfjs } from "react-pdf";

export type PDFDocument = pdfjs.PDFDocumentProxy;

export type PDFPage = pdfjs.PDFPageProxy & {
	width: number;
	height: number;
	originalWidth: number;
	originalHeight: number;
};

export type PDFRenderOptions = {
	width: number;
	height: number;
	baseX: number;
	baseY: number;
	scale: number;
};

export type PDFRenderSize = {
	width: number;
	height: number;
};

export type PDFItemClickHandlerArguments = {
	pageIndex: number;
	destination?: unknown[];
};

export type PDFViewerController = {
	getDocument: () => PDFDocument | null;
	getPage: () => PDFPage | null;
	getPageIndex: () => number;
	setPageIndex: (pageIndex: number) => void;
	hasPreviousPage: () => boolean;
	moveToPreviousPage: () => void;
	hasNextPage: () => boolean;
	moveToNextPage: () => void;
	getPageCount: () => number;
	getRenderOptions: () => PDFRenderOptions;
	setRenderOptions: ({ width, height, baseX, baseY, scale }: PDFRenderOptions) => void;
	getRenderSize: () => PDFRenderSize;
	setRenderSize: ({ width, height }: { width: number; height: number }) => void;
	zoom: ({ offsetX, offsetY, scaleDelta }: { offsetX: number; offsetY: number; scaleDelta: number }) => void;
	isDragModeEnabled: () => boolean;
	setDragModeEnabled: (enabled: boolean) => void;
	drag: ({ deltaX, deltaY }: { deltaX: number; deltaY: number }) => void;
	isItemClickEnabled: () => boolean;
	setItemClickEnabled: (enabled: boolean) => void;
};

export type PDFViewerControllerHook = {
	pdfViewerController: PDFViewerController;
	onPdfDocumentChange: (pdfDocument: PDFDocument | null) => void;
	onPdfPageChange: (pdfPage: PDFPage | null) => void;
	onPdfItemClick: ({ pageIndex, destination }: PDFItemClickHandlerArguments) => void;
	onPdfMouseMoveEvent: (event: MouseEvent) => void;
	onPdfWheelEvent: (event: WheelEvent) => void;
};
