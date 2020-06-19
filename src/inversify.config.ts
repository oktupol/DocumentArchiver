import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './TYPES';
import { ConfigImpl, Config } from './services/Config';
import {
    SaneScanimageWrapper,
    SaneScanimageWrapperImpl,
} from './services/scanner/SaneScanimageWrapper';
import { Scanner, ScannerImpl } from './services/scanner/Scanner';

const myContainer = new Container();
myContainer.bind<Config>(TYPES.Config).to(ConfigImpl);
myContainer
    .bind<SaneScanimageWrapper>(TYPES.SaneScanimageWrapper)
    .to(SaneScanimageWrapperImpl);
myContainer.bind<Scanner>(TYPES.Scanner).to(ScannerImpl);

export { myContainer };
