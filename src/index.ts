#!/usr/bin/env node

import program from 'commander';
import { myContainer } from './inversify.config';
import { Rc } from './services/Rc';
import { TYPES } from './TYPES';

program
    .name('documentarchiver')
    .version('0.1.0')
    .description('Propertly archive physical documents digitally');

program.parse(process.argv);

console.log(myContainer.get<Rc>(TYPES.Rc).config);
console.log(myContainer.get<Rc>(TYPES.Rc).paperFormat);