import { Component } from '@angular/core';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

// Component
import { SubmenuComponent } from './submenu.component';

// Model
import { StSubMenuModel } from '../st-header.model';


let comp: SubmenuComponent;
let fixture: ComponentFixture<SubmenuComponent>;
let de: DebugElement;


@Component({
   template: ''
})
class DummyComponent { }

let menu: StSubMenuModel[] = [
   {
      label: 'USER',
      link: '/navigation/header/test1/subtest1',
      isActive: true
   },
   {
      label: 'GROUP',
      link: '/navigation/header/test1/subtest2',
      isActive: true
   }
];


describe('StHeader component', () => {
   describe('SubMenu component', () => {
      beforeEach(async(() => {
         TestBed.configureTestingModule({
            imports: [
               RouterTestingModule.withRoutes([
                  { path: 'navigation/header/test1/subtest1', component: DummyComponent },
                  { path: 'navigation/header/test1/subtest2', component: DummyComponent }
               ])
            ],
            declarations: [SubmenuComponent, DummyComponent]
         })
            .compileComponents();  // compile template and css
      }));
      beforeEach(() => {
         fixture = TestBed.createComponent(SubmenuComponent);
         comp = fixture.componentInstance;

         comp.submenu = menu;
         comp.offset = 0;

         fixture.autoDetectChanges(true);
      });

      it('should be init correctly', () => {
         let options: DebugElement[] = fixture.debugElement.queryAll(By.css('li'));

         expect(options).toBeDefined();
         expect(options.length).toEqual(2);
      });

      // TODO: Do other test for check navigation
   });
});
