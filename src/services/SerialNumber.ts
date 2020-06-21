import { injectable, inject } from 'inversify';
import { TYPES } from '../TYPES';
import { Rc } from './Rc';
import { Constants } from '../Constants';
import { readFileSync, writeFileSync, existsSync } from 'fs';

export interface SerialNumber {
    currentSerialNumber: number;
    incrementSerialNumber(): void;

    currentDigitalSerialNumber: number;
    incrementDigitalSerialNumber(): void;
}

@injectable()
export class SerialNumberImpl implements SerialNumber {
    private serialNumberFilePath: string;
    private digitalSerialNumberFilePath: string;

    constructor(@inject(TYPES.Rc) private rc: Rc) {
        this.serialNumberFilePath = this.rc.archiveDirectory + '/' + Constants.serialNumberFile;
        this.digitalSerialNumberFilePath = this.rc.archiveDirectory + '/' + Constants.digitalSerialNumberFile;
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

    public get currentDigitalSerialNumber(): number {
        return this._getSerialNumber(this.digitalSerialNumberFilePath);
    }

    public set currentDigitalSerialNumber(newSerialNumber: number) {
        writeFileSync(this.digitalSerialNumberFilePath, `${newSerialNumber}`);
    }

    public incrementDigitalSerialNumber(): void {
        this.currentDigitalSerialNumber = this.currentDigitalSerialNumber + 1;
    }
}
