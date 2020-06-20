import { injectable, inject } from 'inversify';
import { Page } from '../../interfaces/Page';
import { TesseractWrapper } from './TesseractWrapper';
import { TYPES, OutputCallback } from '../../TYPES';
import { AppState } from '../../app/AppState';
import { Constants } from '../../Constants';

export interface Tesseract {
    transscribe(page: Page): Promise<Page>;
    transscribeMultiple(pages: Page[], outputCallback?: OutputCallback): Promise<Array<Page>>;
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

    public async transscribeMultiple(pages: Page[], outputCallback?: OutputCallback): Promise<Array<Page>> {
        const outFile = this._appState.documentDirectory + '/' + Constants.tesseractOutFile;

        await this._wrapper.tesseractMultiple(
            pages.map(page => page.scanLocation),
            outFile,
            this._appState.documentLang,
            outputCallback
        );

        return pages;
    }
}
