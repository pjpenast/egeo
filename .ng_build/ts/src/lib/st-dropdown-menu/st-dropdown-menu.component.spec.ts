import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StDropdownMenuItemComponent } from './st-dropdown-menu-item/st-dropdown-menu-item.component';
import { StDropdownMenuComponent } from './st-dropdown-menu.component';
import { StDropDownMenuItem } from './st-dropdown-menu.interface';

let items: StDropDownMenuItem[] = [
   {
      label: 'example 1',
      value: 1
   },
   {
      label: 'example 2',
      value: 2
   }
];

describe('StDropdownMenuComponent', () => {

   let component: StDropdownMenuComponent;
   let fixture: ComponentFixture<StDropdownMenuComponent>;
   let de: DebugElement;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [StDropdownMenuComponent, StDropdownMenuItemComponent]
      })
      .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StDropdownMenuComponent);
      component = fixture.componentInstance;
   });

   it('should throw an error for missing Items attribute', () => {
      expect(() => component.ngOnInit()).toThrowError('Attribute items is required');
   });

   it('should show two items in component', () => {
      component.items = items;
      fixture.detectChanges();
      expect(component.items.length).toBe(items.length);
   });

   it('should show the menu inactive', () => {
      component.items = items;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('.dropdown-menu')).toBeNull();
   });

   it('should show the menu active', () => {
      component.items = items;
      component.active = true;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('.dropdown-menu')).toBeDefined();
   });


});
