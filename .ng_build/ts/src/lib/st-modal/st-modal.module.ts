import { CommonModule } from '@angular/common';
import { ANALYZE_FOR_ENTRY_COMPONENTS, NgModule } from '@angular/core';

import { StButtonModule } from '../st-button/st-button.module';
import { StModal } from './st-modal.component';

@NgModule({
   imports: [CommonModule, StButtonModule],
   exports: [StModal],
   declarations: [StModal],
   entryComponents: [StModal],
   providers: []
})
export class StModalModule {
   static withComponents(components: any[]): any {
      return {
         ngModule: StModalModule,
         providers: [
            { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: components, multi: true }
         ]
      };
   }
}
