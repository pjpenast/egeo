/*
 * © 2017 Stratio Big Data Inc., Sucursal en España.
 *
 * This software is licensed under the Apache License, Version 2.0.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the terms of the License for more details.
 *
 * SPDX-License-Identifier: Apache-2.0.
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Component
import { StTooltip } from './st-tooltip.component';


let component: StTooltip;
let fixture: ComponentFixture<StTooltip>;
let fakeText: string = 'This text will be displayed in our tooltip';
let nativeElement: any;

describe('StTooltip', () => {

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [FormsModule, ReactiveFormsModule],
         declarations: [StTooltip]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StTooltip);
      component = fixture.componentInstance;
      component.isActive = false;
      nativeElement = fixture.nativeElement;
   });

   it('It has to display a text in its dialog', () => {
      component.text = fakeText;

      fixture.detectChanges();

      expect(nativeElement.querySelector('.st-tooltip .st-tooltip-content span').innerHTML).toEqual(fakeText);
   });

   it('It can be configured to be displayed and hidden when user clicks on its associated content', () => {
      component.showOnClick = true;
      component.isActive = false;
      component.text = fakeText;

      nativeElement.querySelector('.st-tooltip .st-tooltip-content').click();
      fixture.detectChanges();

      expect(component.isActive).toBeTruthy();
      expect(nativeElement.querySelector('.st-tooltip .st-tooltip-content.on-click')).toBeDefined();

      nativeElement.querySelector('.st-tooltip .st-tooltip-content').click();
      fixture.detectChanges();

      expect(component.isActive).toBeFalsy();
      expect(nativeElement.querySelector('.st-tooltip .st-tooltip-content.on-click')).toBe(null);
   });

   it('It can be configured to be displayed and hidden when user puts the mouse on its associated content', () => {
      component.showOnClick = false;
      component.isActive = false;
      component.text = fakeText;

      expect(nativeElement.querySelector('.st-tooltip .st-tooltip-content.on-hover')).toBeDefined();

      nativeElement.querySelector('.st-tooltip .st-tooltip-content').dispatchEvent(new Event('mouseenter'));

      fixture.detectChanges();
      expect(component.isActive).toBeTruthy();

      nativeElement.querySelector('.st-tooltip .st-tooltip-content').dispatchEvent(new Event('mouseleave'));
      fixture.detectChanges();

      expect(component.isActive).toBeFalsy();
   });

   it('It can be configured to be displayed and hidden when user clicks and hover', () => {
      component.showOnClick = true;
      component.isActive = false;
      component.text = fakeText;

      expect(nativeElement.querySelector('.st-tooltip .st-tooltip-content.on-hover')).toBeNull();

      nativeElement.querySelector('.st-tooltip .st-tooltip-content').dispatchEvent(new Event('mouseenter'));

      fixture.detectChanges();
      expect(component.isActive).toBeFalsy();

      nativeElement.querySelector('.st-tooltip .st-tooltip-content').dispatchEvent(new Event('mouseleave'));
      fixture.detectChanges();

      expect(component.isActive).toBeFalsy();
   });
});
