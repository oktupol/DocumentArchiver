import { injectable, inject } from 'inversify';
import { TYPES } from '../TYPES';
import { AppState } from '../app/AppState';
import { Page } from '../interfaces/Page';
import { Constants } from '../Constants';

export interface Pages {
    currentPage: Page;
    nextPage(): void;
}

@injectable()
export class PagesImpl implements Pages {
    private _currentPage = 0;

    constructor(@inject(TYPES.AppState) private appState: AppState) {}

    get currentPage(): Page {
        return {
            pageNumber: this._currentPage,
            pageNumberPadded: this._currentPagePadded,
            scanLocation: this.appState.documentDirectory + `/${this._currentPagePadded}.jpg`,
            transscriptLocation: this.appState.documentDirectory + `/${this._currentPagePadded}`,
        };
    }

    nextPage(): void {
        this._currentPage++;
    }

    private get _currentPagePadded(): string {
        return ('' + this._currentPage).padStart(Constants.pageNumberLength, '0');
    }
}
