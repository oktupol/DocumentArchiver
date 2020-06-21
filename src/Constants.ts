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
            // Regular A4 sheets, portrait orientation
            name: 'a4',
            width: 210,
            height: 297,
        },
        a5: {
            // Regular A5 sheets, portrait orientation
            name: 'a5',
            width: 148,
            height: 210,
        },
        a5landscape: {
            // Regular A5 sheets, landscape orientation
            name: 'a5landscape',
            width: 210,
            height: 148,
        },
        a6a5: {
            // A6/A5 sheets, such as printed bank statements, landscape orientation
            name: 'a6a5',
            width: 210,
            height: 105,
        },
    };
}
