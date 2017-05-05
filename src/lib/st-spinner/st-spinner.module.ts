import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StSpinnerComponent } from './st-spinner.component';

@NgModule({
   imports: [CommonModule],
   declarations: [StSpinnerComponent],
   exports: [StSpinnerComponent]
})
export class StSpinnerModule { }
