import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { StCheckboxComponent } from './st-checkbox.component';

@NgModule({
   imports: [CommonModule],
   declarations: [StCheckboxComponent],
   exports: [StCheckboxComponent]
})
export class StCheckboxModule {
}
