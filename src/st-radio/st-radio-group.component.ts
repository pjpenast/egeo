import { Directive, Input, Output, EventEmitter, OnInit, ContentChildren, forwardRef, QueryList } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { StRadioComponent } from './st-radio.component';

export const MD_RADIO_GROUP_CONTROL_VALUE_ACCESSOR: any = {
   provide: NG_VALUE_ACCESSOR,
   useExisting: forwardRef(() => StRadioGroupComponent),
   multi: true
};

export class RadioChange {
   source: StRadioComponent;
   value: any;
}

let _uniqueIdCounter = 0;

@Directive({
   selector: 'st-radio-group',
   providers: [MD_RADIO_GROUP_CONTROL_VALUE_ACCESSOR],
   host: {
      'role': 'radiogroup'
   }
})
export class StRadioGroupComponent implements OnInit, ControlValueAccessor {

   @Output()
   change: EventEmitter<RadioChange> = new EventEmitter<RadioChange>();

   @Input()
   qaTag: string;

   @Input()
   get value(): any {
      return this._value;
   }

   set value(newValue: any) {
      if (this._value !== newValue) {
         this._value = newValue;
      }

      this.updatedSelectRadiofromValue();
      this.checkSelectRadio();
   }

   @Input()
   get name(): string {
      return this._name;
   }

   set name(value: string) {
      this._name = value;
      this.updateRadioName();
   }

   @Input()
   get selected(): StRadioComponent {
      return this._selected;
   }
   set selected(selected: StRadioComponent) {
      this._selected = selected;
      this.value = selected ? selected.value : null;
      this.checkSelectRadio();
   }

   @Input()
   get disabled(): boolean { return this._disabled; }
   set disabled(value: boolean) {
      this._disabled = (value != null && value !== false) ? true : null;
   }

   @ContentChildren(forwardRef(() => StRadioComponent))
   private _radios: QueryList<StRadioComponent> = null;

   private _value: any = null;
   private _selected: StRadioComponent = null;
   private _disabled: boolean = false;
   private _name: string = `st-radio-group-${_uniqueIdCounter++}`;

   constructor() { }

   _controlValueAccessorChangeFn: (value: any) => void = (value) => { };

   onTouched: () => any = () => { };

   ngOnInit(): void { }

   writeValue(value: any): void {
      this.value = value;
   }

   registerOnChange(fn: (value: any) => void): void {
      this._controlValueAccessorChangeFn = fn;
   }

   registerOnTouched(fn: any): void {
      this.onTouched = fn;
   }

   _emitChangeEvent(): void {
      let event = new RadioChange();
      event.source = this._selected;
      event.value = this._value;
      this.change.emit(event);
   }

   checkSelectRadio(): void {
      if (this.selected && !this._selected.checked) {
         this._selected.checked = true;
      }
   }

   _touch(): void {
      if (this.onTouched) {
         this.onTouched();
      }
   }

   setDisabledState(isDisabled: boolean): void {
      this.disabled = isDisabled;
   }

   private updateRadioName(): void {
      if (this._radios) {
         this._radios.forEach(radio => {
            radio.name = this.name;
         });
      }
   }

   private updatedSelectRadiofromValue(): void {
      let isAlreadySelected = this._selected != null && this._selected.value === this._value;

      if (this._radios != null && !isAlreadySelected) {
         this._selected = null;
         this._radios.forEach(radio => {
            radio.checked = this.value === radio.value;
            if (radio.checked) {
               this._selected = radio;
            }
         });
      }
   }
}
