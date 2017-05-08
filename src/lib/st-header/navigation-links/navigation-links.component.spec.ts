import { Component } from '@angular/core';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

// Component
import { NavigationLinksComponent } from './navigation-links.component';

// Other
import { SubmenuPosDirective } from '../submenu-pos/submenu-pos.directive';

// Model
import { StHeaderModel } from '../st-header.model';


let comp: NavigationLinksComponent;
let fixture: ComponentFixture<NavigationLinksComponent>;
let de: DebugElement;


@Component({
   template: ''
})
class DummyComponent { }

let menu: StHeaderModel[] = [
   {
      icon: 'icon-head',
      label: 'IDENTITIES',
      link: '/navigation/header/test1',
      subMenus: [{
         label: 'USER',
         link: '/navigation/header/test1/subtest1',
         isActive: true
      },
      {
         label: 'GROUP',
         link: '/navigation/header/test1/subtest2',
         isActive: true
      }],
      isActive: true
   },
   {
      icon: 'icon-puzzle',
      label: 'SERVICES',
      link: '/navigation/header/test2',
      subMenus: [],
      isActive: true
   }
];


describe('StHeader component', () => {
   describe('NavigationLink component', () => {
      beforeEach(async(() => {
         TestBed.configureTestingModule({
            imports: [
               RouterTestingModule.withRoutes([
                  { path: 'navigation/header/test1', component: DummyComponent },
                  { path: 'navigation/header/test1/subtest1', component: DummyComponent },
                  { path: 'navigation/header/test1/subtest2', component: DummyComponent },
                  { path: 'navigation/header/test2', component: DummyComponent }
               ])
            ],
            declarations: [SubmenuPosDirective, DummyComponent, NavigationLinksComponent]
         })
            .compileComponents();  // compile template and css
      }));
      beforeEach(() => {
         fixture = TestBed.createComponent(NavigationLinksComponent);
         comp = fixture.componentInstance;

         comp.menu = menu;

         fixture.autoDetectChanges(true);
      });

      it('should be init correctly', () => {
         let option: HTMLLIElement = fixture.debugElement.query(By.css('.option')).nativeElement;
         let active: DebugElement = fixture.debugElement.query(By.css('.sth-active'));
         let outputPos: number;

         comp.positionChange.subscribe((pos: number) => outputPos = pos);

         expect(comp.hasIcon(menu[0])).toBeTruthy();
         expect(active).toBeNull();
      });
   });
});
