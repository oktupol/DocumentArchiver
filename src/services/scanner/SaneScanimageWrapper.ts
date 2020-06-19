import { exec } from 'child_process';
import { promisify } from 'util';

export class SaneScanimageWrapper {
    public async scanImage(
        outFile: string,
        deviceName: string | null = null,
        width: number | null = null,
        height: number | null = null,
        xOffset: number | null = null,
        yOffset: number | null = null
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
