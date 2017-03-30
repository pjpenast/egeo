import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StRadioComponent } from './st-radio.component';
import { StRadioGroupComponent } from './st-radio-group.component';


@NgModule({
   imports: [
      CommonModule
   ],
   exports: [
      StRadioComponent, StRadioGroupComponent
   ],
   declarations: [
      StRadioComponent, StRadioGroupComponent
   ],
   providers: []
})
export class StRadioModule { }
