import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StButtonModule } from '../st-button/st-button.module';
import { StPageTitleComponent } from './st-page-title.component';

@NgModule({
   imports: [CommonModule, StButtonModule],
   declarations: [StPageTitleComponent],
   exports: [StPageTitleComponent]
})
export class StPageTitleModule { }
