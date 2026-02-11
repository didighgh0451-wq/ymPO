import { createContext } from 'react';

export const CursorContext = createContext<{
  cursorVariant: string;
  setCursorVariant: (v: string) => void;
  cursorText: string;
  setCursorText: (t: string) => void;
}>({
  cursorVariant: 'default',
  setCursorVariant: () => {},
  cursorText: '',
  setCursorText: () => {},
});
