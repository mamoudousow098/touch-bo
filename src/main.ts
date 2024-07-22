import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';


platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));

// Disable logs in production
if (environment.production) {
    if (!environment.activeLogs) {
        window.console.log = () => {
        }
    }
    
}
