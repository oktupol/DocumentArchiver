import rc from 'rc';
import { injectable } from 'inversify';

interface ConfigObject {
    tesseractLang: string | null;
    scannerDeviceName: string | null;
    paperFormat: string | null;
    archiveDirectory: string | null;
}

export interface Config {
    config: ConfigObject;
    tesseractLang: string | null;
    scannerDeviceName: string | null;
    paperFormat: string | null;
    archiveDirectory: string | null;
}

@injectable()
export class ConfigImpl implements Config {
    private _config: ConfigObject | null = null;

    get config(): ConfigObject {
        if (this._config === null) {
            this._config = rc('documentarchiver', {
                tesseractLang: null,
                scannerDeviceName: null,
                paperFormat: null,
                archiveDirectory: null,
            }) as ConfigObject;
        }

        return this._config;
    }

    get tesseractLang(): string | null {
        return this.config.tesseractLang;
    }

    get scannerDeviceName(): string | null {
        return this.config.scannerDeviceName;
    }

    get paperFormat(): string | null {
        return this.config.paperFormat;
    }

    get archiveDirectory(): string | null {
        return this.config.archiveDirectory;
    }
}
