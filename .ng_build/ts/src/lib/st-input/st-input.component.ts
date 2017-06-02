import {
   AfterViewInit,
   ChangeDetectionStrategy,
   ChangeDetectorRef,
   Component,
   forwardRef,
   Input,
   OnChanges,
   OnDestroy,
   OnInit,
   SimpleChange,
   SimpleChanges,
   ViewChildren
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { StInputError } from './st-input.error.model';

@Component({
   selector: 'st-input',
   template: `
     <div class="st-input sth-input">
        <div class="st-input-container sth-input-container" [ngClass]="{disabled: isDisabled, error: showError()}">
           <label class="st-input-title sth-input-title" [ngClass]="{error: showError(), active: focus, disabled: isDisabled}" [attr.for]="name">
              <st-tooltip *ngIf="contextualHelp" [text]="contextualHelp" [showOnClick]="true" [qaTag]="qaTag + '-contextual-help'">
                 <span>{{label}}</span>
                 <span class="icon-help2"></span>
              </st-tooltip>
              <span *ngIf="!contextualHelp">{{label}}</span>
           </label>
           <input #input (focus)="onFocus($event)" (focusout)="onFocusOut($event)" (blur)="onFocusOut($event)" [formControl]="internalControl"
              class="st-input-remove-default sth-input-remove-default" [ngClass]="{disabled: isDisabled}"
              [placeholder]="placeholder" [name]="name" [attr.type]="internalType" [attr.maxlength]="maxLength" [attr.id]="qaTag">

           <span class="st-input-bar" [ngClass]="getBarType()"></span>
        </div>
        <div class="st-input-error-layout">
           <div *ngIf="showError()">
              <span class="st-input-error-message sth-input-error-message">{{errorMessage}}</span>
           </div>
        </div>
     </div>
   `,
   styles: [`
     .st-input-remove-default {
       outline: none;
       border: none;
       width: 100%; }

     .st-input-container {
       padding-bottom: 6px;
       position: relative; }

     .st-input-container ::placeholder {
       padding-left: 3px; }

     .st-input-container :invalid {
       box-shadow: none; }

     .st-input-container .st-input-remove-default {
       padding-left: 3px;
       height: 25px; }

     .st-input-container .st-input-title {
       padding: 0;
       position: relative;
       margin-bottom: 7px;
       display: block;
       float: left;
       width: 100%; }

     .st-input-container .st-input-normal-bar {
       position: absolute;
       width: 100%;
       left: 0;
       bottom: -2px; }

     .st-input-container .st-input-normal-bar::before,
     .st-input-container .st-input-normal-bar::after {
       content: "";
       height: 2px;
       width: 0;
       bottom: 0;
       position: absolute; }

     .st-input-container .st-input-normal-bar::before {
       left: 50%; }

     .st-input-container .st-input-normal-bar::after {
       right: 50%; }

     .st-input-container .st-input-error-bar {
       position: absolute;
       width: 100%;
       left: 0;
       bottom: -2px; }

     .st-input-container .st-input-error-bar::before,
     .st-input-container .st-input-error-bar::after {
       content: "";
       height: 2px;
       width: 0;
       bottom: 0;
       position: absolute; }

     .st-input-container .st-input-error-bar::before {
       left: 50%; }

     .st-input-container .st-input-error-bar::after {
       right: 50%; }

     .st-input-container .st-input-remove-default:focus ~ .st-input-bar:before,
     .st-input-container .st-input-remove-default:focus ~ .st-input-bar:after {
       width: 50%; }

     .st-input {
       width: 100%;
       min-height: 90px;
       height: 90px; }

     .st-input-error-layout {
       height: 15px; }
   `],
   providers: [
      { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => StInputComponent), multi: true },
      { provide: NG_VALIDATORS, useExisting: forwardRef(() => StInputComponent), multi: true }
   ],
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class StInputComponent implements ControlValueAccessor, OnChanges, OnInit, OnDestroy {

   @Input() placeholder: string = '';
   @Input() name: string = '';
   @Input() label: string = '';
   @Input() fieldType: 'string' | 'number' | 'password' = 'string';
   @Input() errors: StInputError;
   @Input() qaTag: string;
   @Input() forceValidations: boolean = false;
   @Input() contextualHelp: string;
   @Input() maxLength: number;
   @Input() isFocused: boolean = false;

   @ViewChildren('input') vc: any;

   public isDisabled: boolean = false; // To check disable
   public focus: boolean = false;
   public internalControl: FormControl;
   public internalType: string = 'text';
   public errorMessage: string = undefined;

   private sub: Subscription;
   private valueChangeSub: Subscription;
   private internalInputModel: any = '';

   constructor(private _cd: ChangeDetectorRef) { }

   onChange = (_: any) => { };
   onTouched = () => { };


   validate(control: FormControl): any {
      if (this.sub) {
         this.sub.unsubscribe();
      }
      this.sub = control.statusChanges.subscribe(() => this.checkErrors(control));
   }

   ngOnChanges(change: any): void {
      if (this.forceValidations) {
         this.writeValue(this.internalControl.value);
      }
      this._cd.markForCheck();
   }

   ngOnInit(): void {
      this.internalControl = new FormControl(this.internalInputModel);
      this.internalType = this.fieldType === 'password' ? 'password' : 'text';
      this.valueChangeSub = this.internalControl.valueChanges.subscribe((value) => this.onChange(value));
   }

   ngAfterViewInit(): void {
      if (this.isFocused) {
         this.focus = true;
         this.vc.first.nativeElement.focus();
      }
   }

   ngOnDestroy(): void {
      if (this.valueChangeSub) {
         this.valueChangeSub.unsubscribe();
      }
      if (this.sub) {
         this.sub.unsubscribe();
      }
   }

   // When value is received from outside
   writeValue(value: any): void {
      this.internalControl.setValue(value);
      this.internalInputModel = value;
   }

   // Registry the change function to propagate internal model changes
   registerOnChange(fn: (_: any) => void): void {
      this.onChange = fn;
   }

   // Registry the touch function to propagate internal touch events TODO: make this function.
   registerOnTouched(fn: () => void): void {
      this.onTouched = fn;
   }

   setDisabledState(disable: boolean): void {
      this.isDisabled = disable;
      if (this.isDisabled && this.internalControl && this.internalControl.enabled) {
         this.internalControl.disable();
      } else if (!this.isDisabled && this.internalControl && this.internalControl.disabled) {
         this.internalControl.enable();
      }
      this._cd.markForCheck();
   }

   showError(): boolean {
      return this.errorMessage !== undefined && (!this.internalControl.pristine || this.forceValidations) && !this.focus && !this.isDisabled;
   }

   /** Style functions */
   getBarType(): string {
      return this.showError() ? 'st-input-error-bar sth-input-error-bar' : 'st-input-normal-bar sth-input-normal-bar';
   }

   onFocus(event: Event): void {
      this.focus = true;
   }

   onFocusOut(event: Event): void {
      this.focus = false;
   }

   // When status change call this function to check if have errors
   private checkErrors(control: FormControl): void {
      let errors: { [key: string]: any } = control.errors;
      this.errorMessage = this.getErrorMessage(errors);
      this._cd.markForCheck();
   }

   // Get error message in function of error list.
   private getErrorMessage(errors: { [key: string]: any }): string {
      if (!errors) {
         return undefined;
      }

      if (!this.errors) {
         return '';
      }

      if (errors.hasOwnProperty('required')) {
         return this.errors.required || this.errors.generic || '';
      }
      if (errors.hasOwnProperty('fieldType')) {
         return this.errors.type || this.errors.generic || '';
      }
      if (errors.hasOwnProperty('minlength')) {
         return this.errors.minLength || this.errors.generic || '';
      }
      if (errors.hasOwnProperty('maxlength')) {
         return this.errors.maxLength || this.errors.generic || '';
      }
      if (errors.hasOwnProperty('pattern')) {
         return this.errors.pattern || this.errors.generic || '';
      }
      return '';
   }


}
