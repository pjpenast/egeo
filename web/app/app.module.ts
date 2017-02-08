import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';

/* External libs */
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

/* App Root */
import { AppComponent }       from './app.component';

/* Other modules Imports */
import { LayoutModule } from './layout/layout.module';
import { routing } from './app.routing';

import { EgeoModule } from '../../components';

import { AppStore, State } from './app.store';

// Hot Loader
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';


export function createTranslateLoader(http: Http): TranslateStaticLoader {
    return new TranslateStaticLoader(http, 'assets/langs', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    LayoutModule,
    HttpModule,
    routing,
    EgeoModule.forRoot(),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ AppStore ]
})
export class AppModule {
   constructor( public appRef: ApplicationRef, public appStore: AppStore ) {}
   hmrOnInit(store: any): void {
      if (!store || !store.state) {
         return;
      }
      console.log('HMR store', JSON.stringify(store, undefined, 2));
      // restore state
      this.appStore.setState(store.state);
      // restore input values
      if ('restoreInputValues' in store) {
         store.restoreInputValues();
      }
      this.appRef.tick();
      Object.keys(store).forEach(prop => delete store[prop]);
   }
   hmrOnDestroy(store: any): void {
      const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
      const currentState = this.appStore.getState();
      store.state = currentState;
      // recreate elements
      store.disposeOldHosts = createNewHosts(cmpLocation);
      // save input values
      store.restoreInputValues = createInputTransfer();
      // remove styles
      removeNgStyles();
   }
   hmrAfterDestroy(store: any): void {
      // display new elements
      store.disposeOldHosts();
      delete store.disposeOldHosts;
   }
  }



