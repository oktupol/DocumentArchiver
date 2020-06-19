import { injectable, inject } from 'inversify';
import { TYPES } from '../../TYPES';
import { SaneScanimageWrapper } from './SaneScanimageWrapper';
import { Page } from '../../interfaces/Page';
import { AppState } from '../../app/AppState';
import { Rc } from '../Rc';

export interface Scanner {
    scan(page: Page): Promise<Page>;
}

@injectable()
export class ScannerImpl implements Scanner {
    constructor(
        @inject(TYPES.Rc) private _rc: Rc,
        @inject(TYPES.AppState) private _appState: AppState,
        @inject(TYPES.SaneScanimageWrapper)
        private _wrapper: SaneScanimageWrapper
    ) {}

    public async scan(page: Page): Promise<Page> {
        const scanLocation = page.scanLocation;
        const paperFormat = this._appState.paperFormat;

        await this._wrapper.scanImage(scanLocation, this._rc.scannerDeviceName, paperFormat.width, paperFormat.height);

        return page;
    }
}
