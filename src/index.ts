#!/usr/bin/env node

import program from 'commander';
import { myContainer } from './inversify.config';
import { TYPES } from './TYPES';
import { App } from './app/App';

program.name('documentarchiver').version('0.1.0').description('Propertly archive physical documents digitally');

program.parse(process.argv);

myContainer.get<App>(TYPES.App).run();
