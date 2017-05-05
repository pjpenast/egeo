import { Injectable } from '@angular/core';
import { StRadioComponent } from './st-radio.component';

@Injectable()
export class RadioChange {
   source: StRadioComponent;
   value: any;
}
