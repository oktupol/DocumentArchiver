import { injectable } from 'inversify';
export interface App {
    run(): void;
}

@injectable()
export class AppImpl implements App {
    public run(): void {
        console.log('hello world from the app');
    }
}
