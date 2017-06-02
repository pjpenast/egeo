import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StRadioComponent, StRadioGroupComponent } from './st-radio.component';

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
