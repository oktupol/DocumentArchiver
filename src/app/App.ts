import { injectable, inject } from 'inversify';
import { TYPES } from '../TYPES';
import { Setup } from './Setup';
export interface App {
    run(): void;
}

@injectable()
export class AppImpl implements App {
    constructor(@inject(TYPES.Setup) private setup: Setup) {}

    public run(): void {
        this.checkPrerequisites();

        console.log('hello world from the app');
        this.setup.setup();
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
