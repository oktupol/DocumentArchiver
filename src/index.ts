#!/usr/bin/env node

import program from 'commander';

program
    .name('documentarchiver')
    .version('0.1.0')
    .description('Propertly archive physical documents digitally');

program.parse(process.argv);
