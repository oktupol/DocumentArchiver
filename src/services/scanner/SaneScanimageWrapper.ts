import { exec } from 'child_process';

export class SaneScanimageWrapper {
    public static async scanImage(
        outFile: string,
        deviceName: string | null,
        width: number | null,
        height: number | null,
        xOffset: number | null,
        yOffset: number | null
    ): Promise<string> {
        let command = `scanimage -o ${outFile}`;

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

        const { exitCode } = await exec(command);

        if (exitCode !== null && exitCode > 0) {
            throw new Error(`Could not scan image. Code ${exitCode}`);
        }

        return outFile;
    }
}
