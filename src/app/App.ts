import { injectable, inject } from 'inversify';
import { TYPES } from '../TYPES';
import { Setup } from './Setup';
import { AppState } from './AppState';
import { Pages } from '../services/Pages';
import { Tesseract } from '../services/tesseract/Tesseract';
import { Scanner } from '../services/scanner/Scanner';
import { mkdirSync, writeFileSync } from 'fs';
import chalk from 'chalk';
import { SerialNumber } from '../services/SerialNumber';

export interface App {
    run(): void;
}

@injectable()
export class AppImpl implements App {
    constructor(
        @inject(TYPES.Setup) private setup: Setup,
        @inject(TYPES.AppState) private appState: AppState,
        @inject(TYPES.Pages) private pages: Pages,
        @inject(TYPES.Scanner) private scanner: Scanner,
        @inject(TYPES.Tesseract) private tesseract: Tesseract,
        @inject(TYPES.SerialNumber) private serialNumber: SerialNumber
    ) {}

    public run(): void {
        this.checkPrerequisites();

        this.setup.setup().then(() => {
            this.createDocumentDirectory();
            this.scanPages();
        });
    }

    private createDocumentDirectory(): void {
        const { serialNumber, documentDirectory } = this.appState;
        mkdirSync(documentDirectory, { recursive: true });
        writeFileSync(
            `${documentDirectory}/${serialNumber}.docid`,
            `ID: ${serialNumber}
Name: ${this.appState.documentName}
Category: ${this.appState.documentCategory}
Date: ${this.appState.documentDate.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
`
        );

        console.log(chalk.gray(`Created directory ${documentDirectory}`));
        console.log(
            chalk.white.bgGreen(`  This document's serial number is `) + chalk.white.bgGreen.bold(`${serialNumber}  `)
        );

        this.serialNumber.incrementSerialNumber();
    }

    private scanPages(): void {}

    private checkPrerequisites(): void {
        try {
            this.setup.checkPrerequisites();
        } catch (e) {
            console.error(e.message);
            process.exit(1);
        }
    }
}