import { useState, useEffect, useCallback, useMemo } from "react";
import type { PDFDocument, PDFPage, PDFRenderOptions, PDFRenderSize, PDFItemClickHandlerArguments, PDFViewerControllerHook } from "../types";

export const usePDFViewerController = (): PDFViewerControllerHook => {
	const [pdfDocument, setPdfDocument] = useState<PDFDocument | null>(null);
	const [pdfPage, setPdfPage] = useState<PDFPage | null>(null);
	const [pageIndex, setRawPageIndex] = useState<number>(0);
	const [renderOptions, setRawRenderOptions] = useState<PDFRenderOptions>({
		width: 0,
		height: 0,
		baseX: 0,
		baseY: 0,
		scale: 1,
	});
	const [dragModeEnabled, setDragModeEnabled] = useState(false);
	const [itemClickEnabled, setItemClickEnabled] = useState(true);

	const setPageIndex = useCallback((newPageIndex: number) => {
		setRawPageIndex((pageIndex: number) => {
			if (pageIndex === newPageIndex) {
				return pageIndex;
			}
			setRawRenderOptions({
				width: 0,
				height: 0,
				baseX: 0,
				baseY: 0,
				scale: 1,
			});
			return newPageIndex;
		});
	}, []);

	const setRenderOptions = useCallback(({ width, height, baseX, baseY, scale }: PDFRenderOptions) => {
		const newScale = scale;
		const newBaseX = Math.max(Math.min(width * (1 - 1 / newScale), baseX), 0);
		const newBaseY = Math.max(Math.min(height * (1 - 1 / newScale), baseY), 0);
		const newRenderOptions = {
			width: width,
			height: height,
			baseX: newBaseX,
			baseY: newBaseY,
			scale: newScale,
		};
		setRawRenderOptions((renderOptions) => {
			if (
				renderOptions.width !== newRenderOptions.width ||
				renderOptions.height !== newRenderOptions.height ||
				renderOptions.baseX !== newRenderOptions.baseX ||
				renderOptions.baseY !== newRenderOptions.baseY ||
				renderOptions.scale !== newRenderOptions.scale
			) {
				return newRenderOptions;
			} else {
				console.log("ignore render update");
				return renderOptions;
			}
		});
	}, []);

	const pdfViewerController = useMemo(() => {
		return {
			getDocument: () => {
				return pdfDocument;
			},
			getPage: () => {
				return pdfPage;
			},
			getPageIndex: () => {
				return pageIndex;
			},
			setPageIndex: (pageIndex: number) => {
				setPageIndex(pageIndex);
			},
			hasPreviousPage: () => {
				if (pdfDocument === null) {
					return false;
				}
				return pageIndex > 0;
			},
			moveToPreviousPage: () => {
				if (pdfDocument === null) {
					return;
				}
				setPageIndex(Math.max(pageIndex - 1, 0));
			},
			hasNextPage: () => {
				if (pdfDocument === null) {
					return false;
				}
				return pageIndex < pdfDocument.numPages - 1;
			},
			moveToNextPage: () => {
				if (pdfDocument === null) {
					return;
				}
				setPageIndex(Math.min(pageIndex + 1, pdfDocument.numPages - 1));
			},
			getPageCount: () => {
				return pdfDocument?.numPages || 0;
			},
			getRenderOptions: () => {
				return renderOptions;
			},
			setRenderOptions: ({ width, height, baseX, baseY, scale }: PDFRenderOptions) => {
				setRenderOptions({ width, height, baseX, baseY, scale });
			},
			getRenderSize: () => {
				return {
					width: renderOptions.width,
					height: renderOptions.height,
				};
			},
			setRenderSize: ({ width, height }: PDFRenderSize) => {
				setRenderOptions({
					width: width,
					height: height,
					baseX: renderOptions.baseX,
					baseY: renderOptions.baseY,
					scale: renderOptions.scale,
				});
			},
			zoom: ({ offsetX, offsetY, scaleDelta }: { offsetX: number; offsetY: number; scaleDelta: number }) => {
				const { width, height, baseX, baseY, scale } = renderOptions;
				const newScale = Math.max(Math.min(Number((scale * (1 + scaleDelta)).toFixed(2)), 10), 1);
				if (scale === newScale) {
					return;
				}
				const pdfDocumentOffsetX = Math.max(Math.min(Math.round(baseX + offsetX / scale), Math.floor(width)), 0);
				const pdfDocumentOffsetY = Math.max(Math.min(Math.round(baseY + offsetY / scale), Math.floor(height)), 0);
				const scaledBaseX = pdfDocumentOffsetX - offsetX / newScale;
				const scaledBaseY = pdfDocumentOffsetY - offsetY / newScale;
				setRenderOptions({
					width: width,
					height: height,
					baseX: scaledBaseX,
					baseY: scaledBaseY,
					scale: newScale,
				});
			},
			isDragModeEnabled: () => {
				return dragModeEnabled;
			},
			setDragModeEnabled: (enabled: boolean) => {
				setDragModeEnabled(enabled);
			},
			drag: ({ deltaX, deltaY }: { deltaX: number; deltaY: number }) => {
				setRenderOptions({
					width: renderOptions.width,
					height: renderOptions.height,
					baseX: renderOptions.baseX + deltaX / renderOptions.scale,
					baseY: renderOptions.baseY + deltaY / renderOptions.scale,
					scale: renderOptions.scale,
				});
			},
			isItemClickEnabled: () => {
				return itemClickEnabled;
			},
			setItemClickEnabled: (enabled: boolean) => {
				setItemClickEnabled(enabled);
			},
		};
	}, [setPageIndex, setRenderOptions, pdfDocument, pdfPage, pageIndex, renderOptions, dragModeEnabled, itemClickEnabled]);

	const keydownEventHandler = useCallback(
		(event: KeyboardEvent) => {
			switch (event.key) {
				case "ArrowLeft":
					pdfViewerController.moveToPreviousPage();
					break;
				case "ArrowRight":
					pdfViewerController.moveToNextPage();
					break;
				default:
					break;
			}
		},
		[pdfViewerController],
	);

	useEffect(() => {
		document.addEventListener("keydown", keydownEventHandler);
		return () => document.removeEventListener("keydown", keydownEventHandler);
	}, [keydownEventHandler]);

	const mouseMoveEventHandler = useCallback(
		(event: MouseEvent) => {
			if (!dragModeEnabled) {
				return;
			}
			event.preventDefault();
			if (event.buttons === 1) {
				console.log(event.movementX, event.movementY);
				pdfViewerController.drag({
					deltaX: -event.movementX,
					deltaY: -event.movementY,
				});
			}
		},
		[dragModeEnabled, pdfViewerController],
	);

	const wheelEventHandler = useCallback(
		(event: WheelEvent) => {
			event.preventDefault();
			const targetRect = (event.target as HTMLDivElement).getBoundingClientRect();
			const currentTargetRect = (event.currentTarget as HTMLDivElement).getBoundingClientRect();
			const offsetX = Math.round(event.offsetX + targetRect.left - currentTargetRect.left);
			const offsetY = Math.round(event.offsetY + targetRect.top - currentTargetRect.top);
			const wheelDelta = event.deltaX + event.deltaY + event.deltaZ > 0 ? -1 : 1;
			const scaleRatio = 0.2;
			pdfViewerController.zoom({
				offsetX: offsetX,
				offsetY: offsetY,
				scaleDelta: wheelDelta * scaleRatio,
			});
		},
		[pdfViewerController],
	);

	const itemClickHandler = useCallback(
		({ pageIndex, destination }: PDFItemClickHandlerArguments) => {
			console.log(`Target Page Index: ${pageIndex}`, destination);
			if (itemClickEnabled) {
				setPageIndex(pageIndex);
			}
		},
		[itemClickEnabled, setPageIndex],
	);

	return {
		pdfViewerController: pdfViewerController,
		onPdfDocumentChange: setPdfDocument,
		onPdfPageChange: setPdfPage,
		onPdfItemClick: itemClickHandler,
		onPdfMouseMoveEvent: mouseMoveEventHandler,
		onPdfWheelEvent: wheelEventHandler,
	};
};
