import { injectable } from 'inversify';
import { promisify } from 'util';
import { exec } from 'child_process';

export interface TesseractWrapper {
    tesseract(inFile: string, outFile: string, lang?: string | null): Promise<string>;
}

@injectable()
export class TesseractWrapperImpl implements TesseractWrapper {
    public async tesseract(inFile: string, outFile: string, lang?: string | null): Promise<string> {
        let command = 'tesseract';

        if (lang !== null) {
            command += ` -l ${lang}`;
        }

        command += ` '${inFile}' '${outFile}'`;

        await promisify(exec)(command);

        return outFile;
    }
}
