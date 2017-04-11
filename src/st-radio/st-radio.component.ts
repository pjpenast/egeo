import { Component, Input, EventEmitter, Output, OnInit, Optional } from '@angular/core';

import { SelectOneDispatcher } from '../utils';
import { StRadioGroupComponent } from './st-radio-group.component';
import { RadioChange } from './st-radio.change';


let idUnique: number = 0;

@Component({
   selector: 'st-radio',
   templateUrl: 'st-radio.component.html',
   styleUrls: ['st-radio.component.scss'],
   host: {
      '[class.sth-radio-checked]': 'checked',
      '[attr.id]': 'id'
   }
})
export class StRadioComponent implements OnInit {

   radioGroup: StRadioGroupComponent;

   @Input() id: string = `st-radio-${idUnique++}`;
   @Input() qaTag: string = `st-radio-${idUnique++}`;

   @Input() name: string;
   @Input()
   get checked(): boolean {
      return this._checked;
   }

   set checked(newCheckedState: boolean) {

      if (this._checked !== newCheckedState) {
         this._checked = newCheckedState;
      }

      if (newCheckedState && this.radioGroup && this.radioGroup.value !== this.value) {
         this.radioGroup.selected = this;
      } else if (!newCheckedState && this.radioGroup && this.radioGroup.value === this.value) {
         this.radioGroup.selected = null;
      }

      if (newCheckedState) {
         this._radioDispatcher.notify(this.id, this.name);
      }
   }

   @Input()
   get disabled(): boolean {
      return this._disabled || (this.radioGroup != null && this.radioGroup.disabled);
   }

   set disabled(value: boolean) {
      this._disabled = (value != null && value !== false) ? true : null;
   }

   @Input()
   get value(): any {
      return this._value;
   }

   set value(value: any) {
      if (this._value !== value) {
         this._value = value;

         if (this.radioGroup != null) {
            if (!this.checked) {
               this.checked = this.radioGroup.value === value;
            } else {
               this.radioGroup.selected = null;
            }
         }
      }
   }

   @Output() change: EventEmitter<RadioChange> = new EventEmitter<RadioChange>();

   get inputId(): string {
      return `${this.id}-input`;
   }

   private _value: any = null;
   private _checked: boolean;
   private _disabled: boolean;

   constructor(
      @Optional() radioGroup: StRadioGroupComponent,
      private _radioDispatcher: SelectOneDispatcher
   ) {

      this.radioGroup = radioGroup;
      _radioDispatcher.listen((id: string, name: string) => {
         if (id !== this.id && name === this.name) {
            this.checked = false;
         }
      });
   }

   ngOnInit(): void {
      if (this.radioGroup && this.radioGroup.value) {
         this.checked = this.radioGroup.value === this._value;
      }

      if (this.radioGroup) {
         this.name = this.radioGroup.name;
      }
   }

   onInputBlur(): void {
      if (this.radioGroup) {
         this.radioGroup._touch();
      }
   }

   onInputClick(event: Event): void {
      event.stopPropagation();
   }

   toggleRadio(event: Event): void {

      event.stopPropagation();
      let groupValueChanged = this.radioGroup && this.value !== this.radioGroup.value;

      if (!this.disabled) {
         this.checked = !this.checked;
         this.emitChangeEvent();
      }

      if (this.radioGroup) {
         this.radioGroup._controlValueAccessorChangeFn(this.value);

         if (groupValueChanged) {
            this.radioGroup._emitChangeEvent();
         }
      }

   }

   private emitChangeEvent(): void {
      let event = new RadioChange();
      event.source = this;
      event.value = this._value;
      this.change.emit(event);
   }
}
