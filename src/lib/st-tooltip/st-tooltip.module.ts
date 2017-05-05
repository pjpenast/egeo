import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StTooltip } from './st-tooltip.component';

@NgModule({
   imports: [CommonModule],
   declarations: [StTooltip],
   exports: [StTooltip]
})
export class StTooltipModule { }
