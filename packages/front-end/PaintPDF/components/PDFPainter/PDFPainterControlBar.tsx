import { memo, useEffect } from "react";
import type { PDFPainterController } from "./types";
import ToolPointerIcon from "@assets/icons/tool-pointer.svg";
import ToolHandIcon from "@assets/icons/tool-hand.svg";
import ToolEditIcon from "@assets/icons/tool-edit.svg";
import ArrowLeftIcon from "@assets/icons/arrow-left.svg";
import ArrowRightIcon from "@assets/icons/arrow-right.svg";
import { PDFPainterControlBarButton } from "./PDFPainterControlBarButton.tsx";

const PDFPainterControlBarComponent = ({ pdfPainterController }: { pdfPainterController: PDFPainterController }) => {
	useEffect(() => {
		pdfPainterController.setDragModeEnabled(pdfPainterController.getPaintMode() === "move");
	}, [pdfPainterController]);

	return (
		<div
			style={{
				display: "flex",
				padding: "1em",
				color: "#ffffff",
				backgroundColor: "#aaaaaa",
				justifyContent: "center",
				alignItems: "center",
				gap: "1em",
			}}
		>
			<PDFPainterControlBarButton
				onClick={() => pdfPainterController.setPaintMode("default")}
				disabled={pdfPainterController.getPaintMode() === "default"}
				icon={ToolPointerIcon}
				alt={"기본"}
			/>
			<PDFPainterControlBarButton
				onClick={() => pdfPainterController.setPaintMode("move")}
				disabled={pdfPainterController.getPaintMode() === "move"}
				icon={ToolHandIcon}
				alt={"이동"}
			/>
			<PDFPainterControlBarButton
				onClick={() => pdfPainterController.setPaintMode("draw")}
				disabled={pdfPainterController.getPaintMode() === "draw"}
				icon={ToolEditIcon}
				alt={"그리기"}
			/>
			<PDFPainterControlBarButton onClick={pdfPainterController.moveToPreviousPage} disabled={!pdfPainterController.hasPreviousPage()} icon={ArrowLeftIcon} alt={"이전 페이지"} />
			<div>
				{pdfPainterController.getPageIndex() + 1}/{pdfPainterController.getPageCount()}
			</div>
			<div>{Math.round(pdfPainterController.getRenderOptions().scale * 100)}%</div>
			<PDFPainterControlBarButton onClick={pdfPainterController.moveToNextPage} disabled={!pdfPainterController.hasNextPage()} icon={ArrowRightIcon} alt={"다음 페이지"} />
		</div>
	);
};

export const PDFPainterControlBar = memo(PDFPainterControlBarComponent);
