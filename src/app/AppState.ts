import { PaperFormat } from '../interfaces/PaperFormat';
import { injectable } from 'inversify';

export interface AppState {
    documentName: string;
    documentCategory: string;
    documentDate: Date;
    documentLang: string;
    paperFormat: PaperFormat;
    customPaperFormat: boolean;
    serialNumber: string;
    documentDirectory: string;
    isExistingPdf: boolean;
    existingPdfLocation: string | null;
    deleteOriginalPdf: boolean | null;
    serialNumberPrefix: string | null;
}

@injectable()
export class AppStateImpl implements AppState {
    private _documentName: string | null = null;
    private _documentCategory: string | null = null;
    private _documentDate: Date | null = null;
    private _documentLang: string | null = null;
    private _paperFormat: PaperFormat | null = null;
    private _serialNumber: string | null = null;
    private _documentDirectory: string | null = null;
    private _isExistingPdf: boolean | null = null;

    public existingPdfLocation: string | null = null;
    public deleteOriginalPdf: boolean | null = null;
    public serialNumberPrefix: string | null = null;

    public customPaperFormat: boolean = false;

    get documentName(): string {
        if (this._documentName === null) {
            throw new Error('Illegal state: document name may not be null');
        }
        return this._documentName;
    }

    set documentName(documentName: string) {
        this._documentName = documentName;
    }

    get documentCategory(): string {
        if (this._documentCategory === null) {
            throw new Error('Illegal state: document category may not be null');
        }
        return this._documentCategory;
    }

    set documentCategory(documentCategory: string) {
        this._documentCategory = documentCategory;
    }

    get documentDate(): Date {
        if (this._documentDate === null) {
            throw new Error('Illegal state: document date may not be null');
        }
        return this._documentDate;
    }

    set documentDate(documentDate: Date) {
        this._documentDate = documentDate;
    }

    get documentLang(): string {
        if (this._documentLang === null) {
            throw new Error('Illegal state: document lang may not be null');
        }
        return this._documentLang;
    }

    set documentLang(documentLang: string) {
        this._documentLang = documentLang;
    }

    get paperFormat(): PaperFormat {
        if (this._paperFormat === null) {
            throw new Error('Illegal state: paper format may not be null');
        }
        return this._paperFormat;
    }

    set paperFormat(paperFormat: PaperFormat) {
        this._paperFormat = paperFormat;
    }

    get serialNumber(): string {
        if (this._serialNumber === null) {
            throw new Error('Illegal state: serial number may not be null');
        }
        return this._serialNumber;
    }

    set serialNumber(serialNumber: string) {
        this._serialNumber = serialNumber;
    }

    get documentDirectory(): string {
        if (this._documentDirectory === null) {
            throw new Error('Illegal state: document directory may not be null');
        }
        return this._documentDirectory;
    }

    set documentDirectory(documentDirectory: string) {
        this._documentDirectory = documentDirectory;
    }

    get isExistingPdf(): boolean {
        if (this._isExistingPdf === null) {
            throw new Error('Illegal state: is existing pdf may not be null');
        }
        return this._isExistingPdf;
    }

    set isExistingPdf(isExistingPdf: boolean) {
        this._isExistingPdf = isExistingPdf;
    }
}
