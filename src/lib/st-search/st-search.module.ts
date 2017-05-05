import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StSearchComponent } from './st-search.component';

@NgModule({
   imports: [CommonModule, FormsModule, ReactiveFormsModule],
   declarations: [StSearchComponent],
   exports: [StSearchComponent]
})
export class StSearchModule { }
