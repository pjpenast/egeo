import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NgControl, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

import { SelectOneDispatcher } from '../utils';

import { StRadioComponent } from './st-radio.component';
import { StRadioGroupComponent } from './st-radio-group.component';

describe('StRadioComponent', () => {

   let component: StRadioComponent;
   let fixture: ComponentFixture<StRadioComponent>;
   let compiled: any;
   let de: DebugElement;

   beforeEach(() => {
      TestBed.configureTestingModule({
         declarations: [StRadioComponent],
         providers: [
            SelectOneDispatcher
         ]
      });

      fixture = TestBed.createComponent(StRadioComponent);
      component = fixture.componentInstance;
      compiled = fixture.debugElement.nativeElement;

   });

   describe('When insert input checked', () => {
      it('Should mark the input as checked', () => {
         component.checked = true;
         fixture.detectChanges();
         expect(compiled.querySelector('input').checked).toBeTruthy();
      });
   });

   describe('When add a value to component ', () => {
      it('Should mark the input with the value', () => {
         component.value = 1;
         fixture.detectChanges();
         expect(compiled.querySelector('input').value).toBe('1');
      });

      it('Should not update the value when no change', () => {
         component.value = 1;
         fixture.detectChanges();
         expect(compiled.querySelector('input').value).toBe('1');
         component.value = 1;
         expect(compiled.querySelector('input').value).toBe('1');
      });
   });

   describe('When check the component as disabled', () => {
      it('Should disabled the input', () => {
         component.disabled = true;
         fixture.detectChanges();
         expect(compiled.querySelector('input').disabled).toBeTruthy();
      });
   });

   describe('When clicked about the component', () => {
      it('Should mark as checked the input', () => {
         compiled.querySelector('input').click();
         fixture.detectChanges();
         expect(compiled.querySelector('input').checked).toBeTruthy();
      });
   });

   describe('When clicked about the component disabled', () => {
      it('Should not be checked when disabled', () => {
         component.disabled = true;
         compiled.querySelector('input').click();
         fixture.detectChanges();
         expect(compiled.querySelector('input').checked).toBeFalsy();
      });
   });



});





