import { injectable, inject } from 'inversify';
import { TYPES } from '../TYPES';
import { Setup } from './Setup';
import { AppState } from './AppState';
import { Pages } from '../services/Pages';
import { Tesseract } from '../services/tesseract/Tesseract';
import { Scanner } from '../services/scanner/Scanner';
import { mkdirSync, writeFileSync, unlinkSync, renameSync, copyFileSync } from 'fs';
import chalk from 'chalk';
import { SerialNumber } from '../services/SerialNumber';
import { prompt } from 'inquirer';
import { Page } from '../interfaces/Page';
import { Constants } from '../Constants';
import { spawnSync } from 'child_process';

export interface App {
    run(): Promise<void>;
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

    public async run(): Promise<void> {
        this.checkPrerequisites();

        if (!(await this.setup.setup())) {
            return;
        }

        const pdfFileName = this.appState.documentName.replace(Constants.escapePattern, '-');
        const pdfDestination = this.appState.documentDirectory + '/' + pdfFileName + '.pdf';

        this.createDocumentDirectory();
        this.logSerialNumber();

        if (!this.appState.isExistingPdf) {
            const pages = await this.scanPages();

            this.logSerialNumber();
            process.stdout.write(chalk.gray('Compiling pdf...'));
            await this.transscribePages(pages);

            console.log();

            process.stdout.write(chalk.gray('Removing raw images...'));

            for (const page of pages) {
                unlinkSync(page.scanLocation);
                process.stdout.write(chalk.gray('.'));
            }

            console.log();

            renameSync(this.appState.documentDirectory + '/' + Constants.tesseractOutFile + '.pdf', pdfDestination);
        } else {
            copyFileSync(this.appState.existingPdfLocation!, pdfDestination);

            console.log(chalk.gray('Transscribing text'));

            spawnSync('pdftotext', [
                pdfDestination,
                this.appState.documentDirectory + '/' + Constants.tesseractOutFile + '.txt',
            ]);
        }

        console.log(chalk.green('Done.'));
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

        if (this.appState.isExistingPdf) {
            this.serialNumber.incrementDigitalSerialNumber();
        } else {
            this.serialNumber.incrementSerialNumber();
        }
    }

    private async scanPages(): Promise<Array<Page>> {
        const pages: Page[] = [];
        let stopScanning = false;

        while (true) {
            await this.scanPage(this.pages.currentPage)
                .then(page => {
                    pages.push(page);
                    return page;
                })
                .then(() => {
                    this.pages.nextPage();
                })
                .catch(error => {
                    if (error.message === Constants.stoppedMessage) {
                        console.log('Done scanning pages');
                        stopScanning = true;
                    } else {
                        console.log('Got error ' + error.message);
                        console.log('Retrying scan');
                    }
                });

            if (stopScanning) {
                break;
            }
        }

        return pages;
    }

    private scanPage(page: Page): Promise<Page> {
        return prompt([
            {
                type: 'confirm',
                name: 'scan',
                message: `Scan page #${page.pageNumber}?`,
            },
        ])
            .then(
                answer =>
                    new Promise<Page>((resolve, reject) => {
                        if (answer.scan === false) {
                            reject(new Error(Constants.stoppedMessage));
                        } else {
                            resolve(page);
                        }
                    })
            )
            .then(page => {
                console.log(chalk.gray(`Scanning page ${page.pageNumber}`));
                return this.scanner.scan(page);
            });
    }

    private transscribePages(pages: Page[]): Promise<Array<Page>> {
        const outputCallback = (): void => {
            process.stdout.write(chalk.gray('.'));
        };

        return this.tesseract.transscribeMultiple(pages, outputCallback);
    }

    private logSerialNumber(): void {
        console.log(
            chalk.white.bgGreen(`  This document's serial number is `) +
                chalk.white.bgGreen.bold(`${this.appState.serialNumber}  `)
        );
    }

    private checkPrerequisites(): void {
        try {
            this.setup.checkPrerequisites();
        } catch (e) {
            console.error(e.message);
            process.exit(1);
        }
    }
}
