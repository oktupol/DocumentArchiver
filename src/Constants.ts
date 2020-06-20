import { PaperFormat } from './interfaces/PaperFormat';

export class Constants {
    public static serialNumberFile = '.da-serial-number';
    public static pageNumberLength = 4;
    public static serialNumberLength = 6;
    public static newCategory = 'New Category';
    public static stoppedMessage = 'Stopped scanning pages.';
    public static tesseractOutFile = 'summary';
    public static escapePattern = /[^a-zA-Z0-9-._äöüÄÖÜß]/g;

    public static paperFormats: Record<string, PaperFormat> = {
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
    };
}
