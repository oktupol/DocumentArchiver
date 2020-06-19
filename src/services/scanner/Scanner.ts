import { injectable } from 'inversify';
import { PaperFormat } from '../../interfaces/PaperFormat';

export interface Scanner {}

@injectable()
export class ScannerImpl implements Scanner {
    constructor(private paperFormat: PaperFormat) {}
}
