import { PaperFormat } from './interfaces/PaperFormat';

export class Constants {
    public static serialNumberFile = '.da-serial-number';
    public static pageNumberLength = 4;
    public static serialNumberLength = 6;
    public static newCategory = 'New Category';
    public static stoppedMessage = 'Stopped scanning pages.';
    public static tesseractOutFile = 'summary';

    public static paperFormats: Record<string, PaperFormat> = {
        a0: {
            name: 'a0',
            width: 841,
            height: 1189,
        },
        a1: {
            name: 'a1',
            width: 594,
            height: 841,
        },
        a2: {
            name: 'a2',
            width: 420,
            height: 594,
        },
        a3: {
            name: 'a3',
            width: 297,
            height: 420,
        },
        a4: {
            name: 'a4',
            width: 210,
            height: 297,
        },
        a5: {
            name: 'a5',
            width: 148,
            height: 210,
        },
        a6: {
            name: 'a6',
            width: 105,
            height: 148,
        },
        a7: {
            name: 'a7',
            width: 74,
            height: 105,
        },
        a8: {
            name: 'a8',
            width: 52,
            height: 74,
        },
    };
}
