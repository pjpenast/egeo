import { platformBrowser } from '@angular/platform-browser';
import { decorateModuleRef } from './app/environment';

import { AppModuleNgFactory } from '../compiled/web/app/app.module.ngfactory';


export function main(): Promise<any> {
  return platformBrowser()
    .bootstrapModuleFactory(AppModuleNgFactory)
    .then(decorateModuleRef)
    .catch((err) => console.error(err));
}

export function bootstrapDomReady(): void {
  document.addEventListener('DOMContentLoaded', main);
}

bootstrapDomReady();
