#!/usr/bin/env node

import program from 'commander';
import { myContainer } from './inversify.config';
import { Config } from './services/Config';
import { TYPES } from './TYPES';

program
    .name('documentarchiver')
    .version('0.1.0')
    .description('Propertly archive physical documents digitally');

program.parse(process.argv);

console.log(myContainer.get<Config>(TYPES.Config).config);
console.log(myContainer.get<Config>(TYPES.Config).paperFormat);