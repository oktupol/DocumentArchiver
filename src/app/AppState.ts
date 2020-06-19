import { PaperFormat } from '../interfaces/PaperFormat';
import { injectable } from 'inversify';

export interface AppState {
    documentName: string;
    documentCategory: string;
    documentDate: Date;
    documentLang: string;
    paperFormat: PaperFormat;
    serialNumber: number;
    documentDirectory: string;
}

@injectable()
export class AppStateImpl implements AppState {
    private _documentName: string | null = null;
    private _documentCategory: string | null = null;
    private _documentDate: Date | null = null;
    private _documentLang: string | null = null;
    private _paperFormat: PaperFormat | null = null;
    private _serialNumber: number | null = null;
    private _documentDirectory: string | null = null;

    get documentName(): string {
        if (this._documentName === null) {
            throw new Error('Illegal state: document name may not be null');
        }
        return this._documentName;
    }

    set documentName(documentName: string) {
        if (this._documentName === null) {
            this._documentName = documentName;
        }
    }

    get documentCategory(): string {
        if (this._documentCategory === null) {
            throw new Error('Illegal state: document category may not be null');
        }
        return this._documentCategory;
    }

    set documentCategory(documentCategory: string) {
        if (this._documentCategory === null) {
            this._documentCategory = documentCategory;
        }
    }

    get documentDate(): Date {
        if (this._documentDate === null) {
            throw new Error('Illegal state: document date may not be null');
        }
        return this._documentDate;
    }

    set documentDate(documentDate: Date) {
        if (this._documentDate === null) {
            this._documentDate = documentDate;
        }
    }

    get documentLang(): string {
        if (this._documentLang === null) {
            throw new Error('Illegal state: document lang may not be null');
        }
        return this._documentLang;
    }

    set documentLang(documentLang: string) {
        if (this._documentLang === null) {
            this._documentLang = documentLang;
        }
    }

    get paperFormat(): PaperFormat {
        if (this._paperFormat === null) {
            throw new Error('Illegal state: paper format may not be null');
        }
        return this._paperFormat;
    }

    set paperFormat(paperFormat: PaperFormat) {
        if (this._paperFormat === null) {
            this._paperFormat = paperFormat;
        }
    }

    get serialNumber(): number {
        if (this._serialNumber === null) {
            throw new Error('Illegal state: serial number may not be null');
        }
        return this._serialNumber;
    }

    set serialNumber(serialNumber: number) {
        if (this._serialNumber === null) {
            this._serialNumber = serialNumber;
        }
    }

    get documentDirectory(): string {
        if (this._documentDirectory === null) {
            throw new Error('Illegal state: document directory may not be null');
        }
        return this._documentDirectory;
    }

    set documentDirectory(documentDirectory: string) {
        if (this._documentDirectory === null) {
            this._documentDirectory = documentDirectory;
        }
    }
}
