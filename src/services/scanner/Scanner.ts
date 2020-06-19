import { injectable, inject } from 'inversify';
import { TYPES } from '../../TYPES';
import { SaneScanimageWrapper } from './SaneScanimageWrapper';
import { Page } from '../../interfaces/Page';
import { AppState } from '../../app/AppState';
import { PaperFormat } from '../../interfaces/PaperFormat';
import { Rc } from '../Rc';

export interface Scanner {
    scan(page: Page): Promise<Page>;
}

@injectable()
export class ScannerImpl implements Scanner {
    private _paperFormat: PaperFormat;

    constructor(
        @inject(TYPES.Rc) private _rc: Rc,
        @inject(TYPES.AppState) private _appState: AppState,
        @inject(TYPES.SaneScanimageWrapper)
        private _wrapper: SaneScanimageWrapper
    ) {
        this._paperFormat = _appState.paperFormat;
    }

    public async scan(page: Page): Promise<Page> {
        const scanLocation = page.scanLocation;

        this._wrapper.scanImage(
            scanLocation,
            this._rc.scannerDeviceName,
            this._paperFormat.width,
            this._paperFormat.height
        );

        return page;
    }
}
