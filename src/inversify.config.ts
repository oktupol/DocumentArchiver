import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './TYPES';
import { RcImpl, Rc } from './services/Rc';
import { SaneScanimageWrapper, SaneScanimageWrapperImpl } from './services/scanner/SaneScanimageWrapper';
import { Scanner, ScannerImpl } from './services/scanner/Scanner';
import { PaperFormatsImpl, PaperFormats } from './services/PaperFormats';
import { Pages, PagesImpl } from './services/Pages';
import { AppState, AppStateImpl } from './app/AppState';
import { App, AppImpl } from './app/App';
import { Setup, SetupImpl } from './app/Setup';
import { Tesseract, TesseractImpl } from './services/tesseract/Tesseract';
import { TesseractWrapper, TesseractWrapperImpl } from './services/tesseract/TesseractWrapper';
import { SerialNumber, SerialNumberImpl } from './services/SerialNumber';

const myContainer = new Container();
myContainer.bind<App>(TYPES.App).to(AppImpl);
myContainer.bind<AppState>(TYPES.AppState).to(AppStateImpl).inSingletonScope();
myContainer.bind<Pages>(TYPES.Pages).to(PagesImpl);
myContainer.bind<PaperFormats>(TYPES.PaperFormats).to(PaperFormatsImpl).inSingletonScope();
myContainer.bind<Rc>(TYPES.Rc).to(RcImpl).inSingletonScope();
myContainer.bind<SaneScanimageWrapper>(TYPES.SaneScanimageWrapper).to(SaneScanimageWrapperImpl);
myContainer.bind<Scanner>(TYPES.Scanner).to(ScannerImpl);
myContainer.bind<SerialNumber>(TYPES.SerialNumber).to(SerialNumberImpl).inSingletonScope();
myContainer.bind<Setup>(TYPES.Setup).to(SetupImpl);
myContainer.bind<Tesseract>(TYPES.Tesseract).to(TesseractImpl);
myContainer.bind<TesseractWrapper>(TYPES.TesseractWrapper).to(TesseractWrapperImpl);

export { myContainer };
