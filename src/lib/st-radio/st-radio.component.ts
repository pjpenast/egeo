import {
   Component,
   Input,
   EventEmitter,
   Output,
   OnInit,
   Optional,
   ContentChildren,
   Directive,
   forwardRef,
   QueryList
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { SelectOneDispatcher } from '../utils/unique-dispatcher';
import { RadioChange } from './st-radio.change';


export const MD_RADIO_GROUP_CONTROL_VALUE_ACCESSOR: any = {
   provide: NG_VALUE_ACCESSOR,
   useExisting: forwardRef(() => StRadioGroupComponent),
   multi: true
};

let _uniqueIdCounter = 0;

// tslint:disable-next-line:max-classes-per-file
@Directive({
   selector: 'st-radio-group',
   providers: [MD_RADIO_GROUP_CONTROL_VALUE_ACCESSOR],
   host: {
      role: 'radiogroup'
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
   _radios: QueryList<StRadioComponent> = null;

   _value: any = null;
   _selected: StRadioComponent = null;
   _disabled: boolean = false;
   _name: string = `st-radio-group-${_uniqueIdCounter++}`;

   constructor(
   ) { }

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
         this._radios.forEach((radio) => {
            radio.name = this.name;
         });
      }
   }

   private updatedSelectRadiofromValue(): void {
      let isAlreadySelected = this._selected != null && this._selected.value === this._value;

      if (this._radios != null && !isAlreadySelected) {
         this._selected = null;
         this._radios.forEach((radio) => {
            radio.checked = this.value === radio.value;
            if (radio.checked) {
               this._selected = radio;
            }
         });
      }
   }
}


let idUnique: number = 0;

@Component({
   selector: 'st-radio',
   templateUrl: './st-radio.component.html',
   styleUrls: ['./st-radio.component.scss'],
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

   _value: any = null;
   _checked: boolean;
   _disabled: boolean;

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
