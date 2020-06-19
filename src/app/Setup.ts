import { injectable, inject } from 'inversify';
import { sync } from 'command-exists';
import { TYPES } from '../TYPES';
import { Rc } from '../services/Rc';
import { AppState } from './AppState';
import { existsSync, lstatSync } from 'fs';
import { Constants } from '../Constants';
import { prompt, Answers, QuestionCollection } from 'inquirer';
import { PaperFormats } from '../services/PaperFormats';

export interface Setup {
    checkPrerequisites(): void;

    setup(): Promise<AppState>;
}

@injectable()
export class SetupImpl {
    constructor(
        @inject(TYPES.Rc) private rc: Rc,
        @inject(TYPES.AppState) private appState: AppState,
        @inject(TYPES.PaperFormats) private paperFormats: PaperFormats
    ) {}

    public checkPrerequisites(): void {
        if (!sync('tesseract')) {
            throw new Error('Missing dependency tesseract-ocr.');
        }

        if (!sync('scanimage')) {
            throw new Error('Missing dependency sane.');
        }

        if (this.rc.archiveDirectory === null) {
            throw new Error('An arcive directory has to be specified at ~/.documentarchiverrc.');
        }

        if (this.archiveDirectoryExists() && !this.isArchiveDirectory()) {
            throw new Error('Archive directory location already exists and is not an archive');
        }
    }

    public async setup(): Promise<AppState> {
        return prompt(this.createQuestions())
            .then(
                answers =>
                    new Promise<AppState>((resolve, reject) => {
                        if (!this.archiveDirectoryExists() && answers.createDirectory !== true) {
                            reject(new Error('Chose not to create directory.'));
                        }

                        if (
                            !answers.documentName ||
                            (typeof answers.documentName === 'string' && answers.documentName.length === 0)
                        ) {
                            reject(new Error('Did not provide document name'));
                        }

                        this.appState.documentName = answers.documentName;
                        this.appState.documentCategory = answers.documentCategory;
                        this.appState.documentLang = answers.documentLang;
                        this.appState.documentDate = new Date(answers.documentDate);
                        this.appState.paperFormat = this.paperFormats.getPaperFormat(answers.paperFormat);
                        this.appState.documentDirectory = this.formatDocumentDirectory(
                            this.appState.documentCategory,
                            this.appState.documentDate,
                            this.appState.documentName
                        );

                        resolve(this.appState);
                    })
            )
            .catch((error: Error) => {
                throw new Error('During initialisation: ' + error.message);
            });
    }

    private archiveDirectoryExists(): boolean {
        return existsSync(this.rc.archiveDirectory!);
    }

    private isArchiveDirectory(): boolean {
        return (
            this.archiveDirectoryExists() &&
            lstatSync(this.rc.archiveDirectory!).isDirectory() &&
            existsSync(this.rc.archiveDirectory! + '/' + Constants.serialNumberFile)
        );
    }

    private formatDocumentDirectory(category: string, date: Date, name: string): string {
        const year = Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        return this.rc.archiveDirectory + '/' + category + '/' + year + '/' + name;
    }

    private createQuestions(): QuestionCollection {
        const shouldCreateDocument = (answers: Answers): boolean => {
            return answers.createDirectory === true || this.isArchiveDirectory();
        };

        const notEmpty = (input: string): boolean | string => {
            if (input.length > 0) {
                return true;
            }

            return 'Enter a value';
        };

        const today = new Date();
        const year = Intl.DateTimeFormat('en', { year: 'numeric' }).format(today);
        const month = Intl.DateTimeFormat('en', { month: '2-digit' }).format(today);
        const day = Intl.DateTimeFormat('en', { day: '2-digit' }).format(today);
        const dateString = `${year}-${month}-${day}`;

        const questions: QuestionCollection = [
            {
                type: 'confirm',
                name: 'createDirectory',
                message: `Create Archive directory at ${this.rc.archiveDirectory}?`,
                when: () => !this.archiveDirectoryExists(),
            },
            {
                type: 'input',
                name: 'documentName',
                message: `What's the name of this doucment?`,
                validate: notEmpty,
                when: shouldCreateDocument,
            },
            {
                type: 'input',
                name: 'documentCategory',
                message: 'Which category does this document belong to?',
                validate: notEmpty,
                when: shouldCreateDocument,
            },
            {
                type: 'input',
                name: 'documentDate',
                message: `What's the date on the document?`,
                default: dateString,
                validate: (input: string) => {
                    const pattern = /\d{4}-\d{1,2}-\d{1,2}/;
                    if (input.match(pattern)) {
                        return true;
                    }
                    return 'Please provide a date in the pattern yyyy-mm-dd';
                },
                when: shouldCreateDocument,
            },
            {
                type: 'input',
                name: 'documentLang',
                message: 'Which language is the document in?',
                default: this.rc.tesseractLang,
                when: shouldCreateDocument,
            },
            {
                type: 'list',
                name: 'paperFormat',
                message: 'Which format is the document in?',
                default: this.rc.paperFormat?.name,
                choices: Object.keys(Constants.paperFormats),
                when: shouldCreateDocument,
            },
        ];

        return questions;
    }
}
