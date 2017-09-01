import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initializePlayground, PlaygroundModule } from 'angular-playground';

initializePlayground('bs-root');
platformBrowserDynamic().bootstrapModule(PlaygroundModule);
