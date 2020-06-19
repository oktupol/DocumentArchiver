import { injectable } from 'inversify';

export interface Scanner {}

@injectable()
export class ScannerImpl implements Scanner {
    constructor(private paperFormat: PaperFormat) {}
}
