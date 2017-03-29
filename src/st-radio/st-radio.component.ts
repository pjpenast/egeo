import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
   selector: 'st-radio',
   templateUrl: 'st-radio.component.html',
   styleUrls: ['st-radio.component.scss']
})
export class StRadioComponent implements OnInit {

   @Input() name: string;
   @Input() checked: boolean;
   @Input() disabled: boolean;
   @Input() value: any;
   @Output() change: EventEmitter<any> = new EventEmitter<any>();

   constructor() { }

   ngOnInit(): void { }

   toggleRadio(event: MouseEvent): void {
      if (!this.disabled) {
         this.checked = !this.checked;
         this.change.emit(this.value);
      }
   }
}