import { PDFPainterController } from '@/PaintPDF/components';
import { css } from '@/styled-system/css';
import { useRef } from 'react';
import { toast } from 'react-toastify';

interface PropType {
  pdfPainterController: PDFPainterController;
}
export function PageIndexChange({ pdfPainterController }: PropType) {
  const inputRef = useRef<null | HTMLInputElement>(null);
  const pageCount = pdfPainterController.getPageCount();
  return (
    <div
      className={css({
        display: 'flex',
        height: '2rem',
        fontSize: '1rem',
      })}
    >
      <input
        className={css({
          bg: 'white',
          color: 'black',
          width: '6rem',
          paddingLeft: '0.5rem',
          border: '1px solid',
          borderRadius: '0.35rem 0 0 0.35rem',
          _hover: {
            borderColor: 'primary.100',
          },
          _focus: {
            borderColor: 'primary.500',
          },
        })}
        placeholder="페이지 입력"
        ref={inputRef}
        required
      />
      <button
        className={css({
          cursor: 'pointer',
          width: '4rem',
          bg: 'primary.500',
          color: 'white',
          borderRadius: '0 0.35rem 0.35rem 0',
          _hover: {
            bg: 'primary.200',
          },
        })}
        onClick={() => {
          if (inputRef.current === null) return;
          const value = inputRef.current.value;
          if (value.trim() === '') {
            return;
          }
          const number = Number(value);
          if (Number.isNaN(number)) {
            toast('숫자를 입력해주세요.', { type: 'error' });
            return;
          }
          if (number <= 0 || number > pageCount) {
            toast(`유효한 범위:${1} ~ ${pageCount} 를 입력해주세요.`, {
              type: 'error',
            });
            return;
          }
          pdfPainterController.setPageIndex(number - 1);
        }}
      >
        이동
      </button>
    </div>
  );
}
