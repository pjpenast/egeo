import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StRadioMenuComponent } from './st-radio-menu.component';

@NgModule({
   imports: [CommonModule, FormsModule, ReactiveFormsModule],
   declarations: [StRadioMenuComponent],
   exports: [StRadioMenuComponent]
})
export class StRadioMenuModule { }
