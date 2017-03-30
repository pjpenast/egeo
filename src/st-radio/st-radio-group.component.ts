import { Directive, Input, Output, EventEmitter, OnInit, ContentChildren, forwardRef, QueryList } from '@angular/core';

import { StRadioComponent } from './st-radio.component';

@Directive({
   selector: 'st-radio-group'
})

export class RadioChange {
   source: StRadioComponent;
   value: any;
}

export class StRadioGroupComponent implements OnInit {

   @Output()
   change: EventEmitter<RadioChange> = new EventEmitter<RadioChange>();

   @ContentChildren(forwardRef(() => StRadioComponent))
   private _radios: QueryList<StRadioComponent> = null;


   constructor() { }

   ngOnInit(): void { }
}