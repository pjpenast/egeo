import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StModalService, StMessageModalComponent } from './st-modal';
import { DECLARATIONS } from './modules';


@NgModule({
   imports: [
      CommonModule,
      ...DECLARATIONS
   ],
   declarations: [StMessageModalComponent],
   exports: [
      ...DECLARATIONS
   ]
})
export class EgeoModule {
   static forRoot(): ModuleWithProviders {
      return {
         ngModule: EgeoModule,
         providers: [StModalService]
      };
   }
}
