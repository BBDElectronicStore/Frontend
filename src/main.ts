// import { AppModule } from './app/app.module'
// import { AppComponent } from './app/app.component';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// platformBrowserDynamic()
//       .bootstrapModule(AppModule)
//       .catch((err) => console.error('Problem bootstrapping angular project', err));

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch(err =>
  console.error('Problem bootstrapping angular project', err)
);
