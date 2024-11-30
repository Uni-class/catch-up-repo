import { PDFPainterController } from '@/PaintPDF/components';
import { css } from '@/styled-system/css';
import { styled } from '@/styled-system/jsx';
import RightIcon from '@/public/icons/chevron-right.svg';
import LeftIcon from '@/public/icons/chevron-left.svg';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import { PageIndexChange } from './PageIndexChange';
import { PageIndexShow } from './PageIndexShow';
import { PageZoomControl } from './PageZoomControl';

interface PropType {
  pdfPainterController: PDFPainterController;
}

export function PDFFooter({ pdfPainterController }: PropType) {
  const pageIndex = pdfPainterController.getPageIndex();
  const pageCount = pdfPainterController.getPageCount();

  return (
    <div
      className={css({
        height: '4.16rem',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      })}
    >
      <PageZoomControl pdfPainterController={pdfPainterController} />
      <PageIndexShow pdfPainterController={pdfPainterController} />
      <PageIndexChange pdfPainterController={pdfPainterController} />
    </div>
  );
}
