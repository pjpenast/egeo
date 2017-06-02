import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { StModalService } from './st-modal/st-modal.service';
import { StPaginationService } from './st-pagination/st-pagination.service';
import { EgeoResolveService } from './utils/egeo-resolver/egeo-resolve.service';
import { SelectOneDispatcher } from './utils/unique-dispatcher';

import { DECLARATIONS } from './barrels';

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
