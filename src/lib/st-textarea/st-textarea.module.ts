import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StTooltipModule } from '../st-tooltip/st-tooltip.module';
import { StTextareaComponent } from './st-textarea.component';

@NgModule({
   imports: [CommonModule, FormsModule, ReactiveFormsModule, StTooltipModule],
   declarations: [StTextareaComponent],
   exports: [StTextareaComponent]
})
export class StTextareaModule { }
