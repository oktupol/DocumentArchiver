import { injectable, inject } from 'inversify';
import { TYPES } from '../TYPES';
import { Rc } from './Rc';
import { Constants } from '../Constants';
import { readFileSync, writeFileSync, existsSync } from 'fs';

export interface SerialNumber {
    currentSerialNumber: number;
    incrementSerialNumber(): void;
}

@injectable()
export class SerialNumberImpl implements SerialNumber {
    private serialNumberFilePath: string;

    constructor(@inject(TYPES.Rc) private rc: Rc) {
        this.serialNumberFilePath = this.rc.archiveDirectory + '/' + Constants.serialNumberFile;
    }

    public get currentSerialNumber(): number {
        if (!existsSync(this.serialNumberFilePath)) {
            return 1;
        }

        return +readFileSync(this.serialNumberFilePath);
    }

    public set currentSerialNumber(newSerialNumber: number) {
        writeFileSync(this.serialNumberFilePath, `${newSerialNumber}`);
    }

    public incrementSerialNumber(): void {
        this.currentSerialNumber = this.currentSerialNumber + 1;
    }
}
