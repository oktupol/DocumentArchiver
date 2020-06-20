import { injectable } from 'inversify';
import { promisify } from 'util';
import { exec, spawn } from 'child_process';
import { OutputCallback } from '../../TYPES';

export interface TesseractWrapper {
    tesseract(inFile: string, outFile: string, lang?: string | null): Promise<string>;
    tesseractMultiple(
        inFile: string[],
        outFile: string,
        lang?: string | null,
        outputCallback?: OutputCallback
    ): Promise<string>;
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

    public async tesseractMultiple(
        inFile: string[],
        outFile: string,
        lang?: string | null,
        outputCallback?: OutputCallback
    ): Promise<string> {
        const inFiles = inFile.join('\n');

        const command = 'tesseract';
        const spawnargs: string[] = [];

        if (lang) {
            spawnargs.push('-l', lang);
        }

        spawnargs.push('stdin');
        spawnargs.push(outFile);

        spawnargs.push('pdf');
        spawnargs.push('txt');

        return new Promise<string>((resolve, reject) => {
            const child = spawn(command, spawnargs);
            child.stdin.write(inFiles + '\n');
            child.stdin.end();

            if (outputCallback) {
                child.stdout.on('data', outputCallback);
                child.stderr.on('data', outputCallback);
            }

            child.on('close', code => {
                if (code === 0) {
                    resolve(outFile);
                } else {
                    reject(new Error('tesseract returned ' + code));
                }
            });
        });
    }
}
