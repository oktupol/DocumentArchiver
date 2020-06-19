import { exec } from 'child_process';
import { promisify } from 'util';
import { injectable } from 'inversify';

export interface SaneScanimageWrapper {
    scanImage(
        outFile: string,
        deviceName?: string | null,
        width?: number | null,
        height?: number | null,
        xOffset?: number | null,
        yOffset?: number | null
    ): Promise<string>;
}

@injectable()
export class SaneScanimageWrapperImpl implements SaneScanimageWrapper {
    public async scanImage(
        outFile: string,
        deviceName?: string | null,
        width?: number | null,
        height?: number | null,
        xOffset?: number | null,
        yOffset?: number | null
    ): Promise<string> {
        let command = `scanimage`;

        if (deviceName !== null) {
            command += ` -d '${deviceName}'`;
        }

        if (width !== null) {
            command += ` -x ${width}`;
        }

        if (height !== null) {
            command += ` -y ${height}`;
        }

        if (xOffset !== null) {
            command += ` -l ${xOffset}`;
        }

        if (yOffset !== null) {
            command += ` -t ${yOffset}`;
        }

        command += ` --format jpeg -o ${outFile}`;

        await promisify(exec)(command);

        return outFile;
    }
}
