import { injectable } from 'inversify';
import { Constants } from '../Constants';
import { PaperFormat } from '../interfaces/PaperFormat';

export interface PaperFormats {
    getPaperFormat(name: string): PaperFormat;
}

@injectable()
export class PaperFormatsImpl implements PaperFormats {
    public getPaperFormat(name: string): PaperFormat {
        if (!Object.keys(Constants.paperFormats).includes(name)) {
            throw new Error('Invalid paper format name');
        }

        return Constants.paperFormats[name];
    }
}
