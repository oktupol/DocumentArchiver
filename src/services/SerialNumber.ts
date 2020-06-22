import { injectable, inject } from 'inversify';
import { TYPES } from '../TYPES';
import { Rc } from './Rc';
import { Constants } from '../Constants';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { AppState } from '../app/AppState';

export interface SerialNumber {
    currentSerialNumber: number;
    incrementSerialNumber(): void;
}

@injectable()
export class SerialNumberImpl implements SerialNumber {
    private serialNumberFilePath: string;

    constructor(@inject(TYPES.Rc) private rc: Rc, @inject(TYPES.AppState) private appState: AppState) {
        if (this.appState.serialNumberPrefix) {
            this.serialNumberFilePath =
                this.rc.archiveDirectory + '/' + Constants.serialNumberFile + '-' + appState.serialNumberPrefix;
        } else {
            this.serialNumberFilePath = this.rc.archiveDirectory + '/' + Constants.serialNumberFile;
        }
    }

    private _getSerialNumber(filePath: string): number {
        if (!existsSync(filePath)) {
            return 1;
        }

        return +readFileSync(filePath);
    }

    public get currentSerialNumber(): number {
        return this._getSerialNumber(this.serialNumberFilePath);
    }

    public set currentSerialNumber(newSerialNumber: number) {
        writeFileSync(this.serialNumberFilePath, `${newSerialNumber}`);
    }

    public incrementSerialNumber(): void {
        this.currentSerialNumber = this.currentSerialNumber + 1;
    }
}
