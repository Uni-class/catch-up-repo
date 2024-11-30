import { css } from '@/styled-system/css';
import { ReactNode, useEffect } from 'react';
import CloseIcon from '@/public/icons/close.svg';

interface PropType {
  children: ReactNode;
  onClose: () => void;
}

export const ModalContainer = ({ onClose, children }: PropType) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
  return (
    <dialog
      open
      className={css({
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 100,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(64, 64, 64, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      })}
      onClick={onClose}
    >
      <div
        className={css({
          backgroundColor: '#fff',
          borderRadius: '1rem',
          padding: '1rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          alignItems: 'flex-start',
          width: '30rem',
        })}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          })}
        >
          <h1
            className={css({
              fontSize: '1.5rem',
              fontWeight: 'semibold',
              color: 'black',
            })}
          >
            세션 정보
          </h1>
          <button
            onClick={() => {
              onClose();
            }}
            className={css({ cursor: 'pointer' })}
          >
            <CloseIcon width={'1.5rem'} height={'1.5rem'} color={'#000'} />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
};
