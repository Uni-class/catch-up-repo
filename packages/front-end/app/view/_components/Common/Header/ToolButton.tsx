import { styled } from '@/styled-system/jsx';

export const ToolButton = styled('button', {
  base: {
    width: '3rem',
    height: '3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    bg: 'primary.400',
    fontSize: '1rem',
    cursor: 'pointer',
    borderRadius: '100%',
    overflow: 'hidden',
    _disabled: {
      bg: 'secondary.200',
      color: 'black',
      border: '1px solid black',
      cursor: 'default',
      _hover: {
        color: 'black',
      },
    },
    _hover: {
      color: 'primary.50',
    },
  },
});
