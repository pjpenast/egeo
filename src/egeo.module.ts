import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StModalService } from './st-modal';
import { StPaginationService } from './st-pagination';
import { EgeoResolveService, SelectOneDispatcher } from './utils';

import { DECLARATIONS } from './modules';


@NgModule({
   imports: [
      CommonModule,
      ...DECLARATIONS
   ],
   declarations: [],
   exports: [
      ...DECLARATIONS
   ]
})
export class EgeoModule {
   static forRoot(): ModuleWithProviders {
      return {
         ngModule: EgeoModule,
         providers: [StModalService, StPaginationService, EgeoResolveService, SelectOneDispatcher]
      };
   }
}
