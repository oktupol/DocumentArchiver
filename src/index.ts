#!/usr/bin/env node

import program from 'commander';
import { myContainer } from './inversify.config';
import { TYPES } from './TYPES';
import { App } from './app/App';
import { AppState } from './app/AppState';

program
    .name('documentarchiver')
    .version('0.1.0')
    .description('Propertly archive physical documents digitally')
    .option('-p, --pdf-file <file>', 'Add an existing PDF into the archive.')
    .option(
        '-d, --delete-original',
        'Whether the original pdf file should be deleted. Implies "-x d" unless otherwise specified.',
        false
    )
    .option('-x, --prefix <prefix>', 'Serial number prefix');

program.parse(process.argv);

const state = myContainer.get<AppState>(TYPES.AppState);

if (program.pdfFile) {
    state.isExistingPdf = true;
    state.existingPdfLocation = program.pdfFile;
    state.deleteOriginalPdf = program.deleteOriginal;
    state.serialNumberPrefix = 'd';
} else {
    state.isExistingPdf = false;
}

if (program.prefix) {
    state.serialNumberPrefix = program.prefix.toLowerCase();
}

myContainer.get<App>(TYPES.App).run();
