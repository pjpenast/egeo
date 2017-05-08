import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const CHECKBOX_CONTROL_ACCESSOR: any = {
   provide: NG_VALUE_ACCESSOR,
   useExisting: forwardRef(() => StCheckboxComponent),
   multi: true
};

@Component({
   selector: 'st-checkbox',
   templateUrl: './st-checkbox.component.html',
   providers: [CHECKBOX_CONTROL_ACCESSOR],
   styleUrls: ['./st-checkbox.component.scss']
})

export class StCheckboxComponent implements ControlValueAccessor {

   @Input() get checked(): boolean {
      return this._checked;
   }

   set checked(checked: boolean) {
      if (checked !== this.checked) {
         this._checked = checked;
      }
   }

   @Input() name: string;
   @Input() qaTag: string;
   @Input() disabled: boolean;
   @Input() required: boolean;
   @Input() readonly: boolean;
   @Output() change: EventEmitter<any> = new EventEmitter<any>();

   @Input()
   get value(): any {
      return this._value;
   }

   set value(value: any) {
      this._value = value;
      this.onTouched();
   }

   private _value: string;
   private _values: any;
   private _checked: boolean = false;

   constructor() {

   }

   _controlValueAccessorChangeFn: (value: any) => void = (value) => { };

   onTouched: () => any = () => { };

   handleClick(): void {
      if (!this.readonly) {
         if (!this.disabled) {
            this.checked = !this.checked;
         }
      }
   }

   handleChange(): void {
      this.updateValues();
      this.change.emit({ checked: this.checked, value: this.value });
   }

   writeValue(value: any): void {
      if (this.checkValueExists(value)) {
         this.checked = true;
      }
   }

   checkValueExists(values: any): boolean {

      if (values instanceof Array) {
         if (values.indexOf(this.value) > -1) {
            return true;
         }
      } else {
         if (values === this.value) {
            return true;
         }
      }

      this._values = values;

      return false;
   }

   updateValues(): void {

      if (this._values instanceof Array) {
         if (this.checked) {
            this._values.push(this.value);
         } else {
            let index = this._values.indexOf(this.value);
            this._values.splice(index, 1);
         }
      } else {
         if (this.checked) {
            this._values = this.value;
         } else {
            this._values = undefined;
         }
      }

      this._controlValueAccessorChangeFn(this._values);

   }

   registerOnChange(fn: (value: any) => void): void {
      this._controlValueAccessorChangeFn = fn;
   }

   registerOnTouched(fn: any): void {
      this.onTouched = fn;
   }

}
