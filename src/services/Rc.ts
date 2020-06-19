import rc from 'rc';
import { injectable, inject } from 'inversify';
import { PaperFormat } from '../interfaces/PaperFormat';
import { PaperFormats } from './PaperFormats';
import { TYPES } from '../TYPES';

interface RcConfiguration {
    tesseractLang: string | null;
    scannerDeviceName: string | null;
    paperFormat: string | null;
    archiveDirectory: string | null;
}

export interface Rc {
    config: RcConfiguration;
    tesseractLang: string | null;
    scannerDeviceName: string | null;
    paperFormat: PaperFormat | null;
    archiveDirectory: string | null;
}

@injectable()
export class RcImpl implements Rc {
    private _config: RcConfiguration | null = null;

    constructor(@inject(TYPES.PaperFormats) private _paperFormats: PaperFormats) {}

    get config(): RcConfiguration {
        if (this._config === null) {
            this._config = rc('documentarchiver', {
                tesseractLang: null,
                scannerDeviceName: null,
                paperFormat: null,
                archiveDirectory: null,
            }) as RcConfiguration;
        }

        return this._config;
    }

    get tesseractLang(): string | null {
        return this.config.tesseractLang;
    }

    get scannerDeviceName(): string | null {
        return this.config.scannerDeviceName;
    }

    get paperFormat(): PaperFormat | null {
        if (this.config.paperFormat === null) {
            return null;
        }

        return this._paperFormats.getPaperFormat(this.config.paperFormat);
    }

    get archiveDirectory(): string | null {
        return this.config.archiveDirectory;
    }
}
