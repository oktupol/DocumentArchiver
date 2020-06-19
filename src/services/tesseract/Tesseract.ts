import { injectable, inject } from 'inversify';
import { Page } from '../../interfaces/Page';
import { TesseractWrapper } from './TesseractWrapper';
import { TYPES } from '../../TYPES';
import { AppState } from '../../app/AppState';

export interface Tesseract {
    transscribe(page: Page): Promise<Page>;
}

@injectable()
export class TesseractImpl implements Tesseract {
    constructor(
        @inject(TYPES.TesseractWrapper) private _wrapper: TesseractWrapper,
        @inject(TYPES.AppState) private _appState: AppState
    ) {}

    public async transscribe(page: Page): Promise<Page> {
        await this._wrapper.tesseract(page.scanLocation, page.transscriptLocation, this._appState.documentLang);
        return page;
    }
}
