import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StInfoBoxComponent } from './st-info-box.component';

@NgModule({
   imports: [CommonModule],
   declarations: [StInfoBoxComponent],
   exports: [StInfoBoxComponent]
})
export class StInfoBoxModule { }
