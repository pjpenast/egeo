import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NgModel, NgControl, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

import { SelectOneDispatcher } from '../utils';

import { StRadioComponent } from './st-radio.component';
import { StRadioGroupComponent } from './st-radio-group.component';

describe('StRadioGroup', () => {

   let fixture: ComponentFixture<RadioGroupWithModel>;
   let compiled: any;
   let groupDebugElement: DebugElement;
   let groupNativeElement: HTMLElement;
   let radioDebugElements: DebugElement[];
   let radioNativeElements: HTMLElement[];
   let radioLabelElements: HTMLLabelElement[];
   let radioInputElements: HTMLInputElement[];
   let groupInstance: StRadioGroupComponent;
   let radioInstances: StRadioComponent[];
   let testComponent: RadioGroupWithModel;
   let groupNgControl: NgControl;

   beforeEach(() => {
      TestBed.configureTestingModule({
         imports: [FormsModule, ReactiveFormsModule],
         declarations: [StRadioComponent, StRadioGroupComponent, RadioGroupWithModel],
         providers: [
            SelectOneDispatcher
         ]
      });

      fixture = TestBed.createComponent(RadioGroupWithModel);
      fixture.detectChanges();

      testComponent = fixture.debugElement.componentInstance;
      groupDebugElement = fixture.debugElement.query(By.directive(StRadioGroupComponent));
      groupNativeElement = groupDebugElement.nativeElement;
      groupInstance = groupDebugElement.injector.get(StRadioGroupComponent);

      radioDebugElements = fixture.debugElement.queryAll(By.directive(StRadioComponent));
      radioNativeElements = radioDebugElements.map(debugEl => debugEl.nativeElement);
      radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);

      radioLabelElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('label')).nativeElement);
      radioInputElements = radioDebugElements
         .map(debugEl => debugEl.query(By.css('input')).nativeElement);

      groupNgControl = groupDebugElement.injector.get(NgControl);


   });

   it('should set individual radio names based on the group name', () => {
      groupInstance.name = 'example';
      fixture.detectChanges();

      expect(groupInstance.name).toBeTruthy();
      for (let radio of radioInstances) {
         expect(radio.name).toBe(groupInstance.name);
      };
   });

   it('should update the group value when one of the radios changes', () => {
      expect(groupInstance.value).toBeFalsy();
      radioInstances[0].checked = true;
      fixture.detectChanges();
      expect(groupInstance.value).toBe('1');
      expect(groupInstance.selected).toBe(radioInstances[0]);
   });

   it('should emit change event when value of group change', () => {
      groupInstance.value = '1';
      radioInstances[1].checked = true;
      fixture.detectChanges();
      expect(groupInstance.value).toBe('2');
      expect(groupInstance.selected).toBe(radioInstances[1]);
   });

   it('should blur about component radio', () => {
      expect(groupNgControl.touched).toBe(false);
      radioInstances[0].onInputBlur();
      fixture.detectChanges();

      expect(groupNgControl.touched).toBe(true);
   });

   @Component({
      template: `
            <st-radio-group [(ngModel)]="modelValue" (change)="lastEvent = $event">
                  <st-radio *ngFor="let item of items" [value]="item.value">
                  {{item.label}}
                  </st-radio>
            </st-radio-group>      
      `
   })
   class RadioGroupWithModel {
      modelValue: string;
      items: Array<any> = [
         { label: 'example1', value: '1' },
         { label: 'example2', value: '2' },
         { label: 'example3', value: '3' }
      ];
   }

});


describe('StRadioGroup with FormControl', () => {

   let component: RadioGroup;
   let groupDebugElement: DebugElement;
   let groupInstance: StRadioComponent;

   let fixture: ComponentFixture<RadioGroup>;

   let compiled: any;
   let de: DebugElement;

   beforeEach(() => {
      TestBed.configureTestingModule({
         imports: [
            ReactiveFormsModule,
            FormsModule
         ],
         declarations: [StRadioComponent, StRadioGroupComponent, RadioGroup],
         providers: [
            SelectOneDispatcher
         ]
      });

      fixture = TestBed.createComponent(RadioGroup);
      groupDebugElement = fixture.debugElement.query(By.directive(StRadioGroupComponent));
      groupInstance = groupDebugElement.injector.get(StRadioGroupComponent);
      component = fixture.componentInstance;
      compiled = fixture.debugElement.nativeElement;
   });


   @Component({
      template: `
         <st-radio-group [formControl]="formControl">
            <st-radio value="1">One</st-radio>
         </st-radio-group>
      `
   })
   class RadioGroup {
      formControl: FormControl = new FormControl();
   };

   describe('When form control marked as disabled', () => {

      it('Should toggle the disabled state', () => {
         component.formControl.disable();
         fixture.detectChanges();
         expect(groupInstance.disabled).toBeTruthy();

         component.formControl.enable();
         fixture.detectChanges();
         expect(groupInstance.disabled).toBeFalsy();

      });

   });

   describe('When add value to the form control', () => {

      it('Should update the component group with the value', () => {
         component.formControl.setValue('example');
         fixture.detectChanges();
         expect(groupInstance.value).toBe('example');
      });

   });


});
