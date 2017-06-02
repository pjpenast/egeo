import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StDropdownMenuModule } from '../st-dropdown-menu/st-dropdown-menu.module';
import { StDropDownMenuItem } from '../st-dropdown-menu/st-dropdown-menu.interface';
import { StDropdownComponent } from './st-dropdown.component';

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

describe('StDropdownComponent', () => {

   let component: StDropdownComponent;
   let fixture: ComponentFixture<StDropdownComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [StDropdownMenuModule],
         declarations: [StDropdownComponent]
      })
         .compileComponents();  // compile template and css
   }));


   beforeEach(() => {
      fixture = TestBed.createComponent(StDropdownComponent);
      component = fixture.componentInstance;

   });

   it('should be a dropdown inactive by default', () => {
      component.button = 'Example';
      component.items = items;
      fixture.detectChanges();
      expect(component.active).toBeFalsy();
   });

   it('should be a dropdown active', () => {
      component.button = 'Example';
      component.items = items;
      component.active = true;
      fixture.detectChanges();
      expect(fixture.componentInstance.active).toBeTruthy();
   });

});
