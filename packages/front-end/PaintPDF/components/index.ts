export * from './Painter';
export * from './PDF';
export * from './PDFPainter';

import _CleanPainterSnapshot from '../assets/data/snapshot.json';
import { EditorSnapshot } from './PDFPainter';
const CleanPainterSnapshot = _CleanPainterSnapshot as unknown as EditorSnapshot;
export { CleanPainterSnapshot };
