import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StTooltipModule } from '../st-tooltip/st-tooltip.module';
import { StInputComponent } from './st-input.component';

@NgModule({
   imports: [CommonModule, FormsModule, ReactiveFormsModule, StTooltipModule],
   declarations: [StInputComponent],
   exports: [StInputComponent]
})
export class StInputModule { }
