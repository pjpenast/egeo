import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

// Component
import { UserMenuComponent } from './user-menu.component';

// Component
import { StHeaderUserMenuModel } from '../st-header.model';


let comp: UserMenuComponent;
let fixture: ComponentFixture<UserMenuComponent>;
let de: DebugElement;

let userMenu: StHeaderUserMenuModel = {
   userName: 'Antonio H.',
   logoutLabel: 'Logout',
   logoutPath: 'path'
};

describe('StHeader component', () => {
   describe('UserMenu component', () => {
      beforeEach(async(() => {
         TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [UserMenuComponent]
         })
            .compileComponents();  // compile template and css
      }));

      beforeEach(() => {
         fixture = TestBed.createComponent(UserMenuComponent);
         comp = fixture.componentInstance;

         comp.userMenuModel = userMenu;

         fixture.detectChanges();
         fixture.autoDetectChanges(true);
      });
      it('should be init correctly', () => {

         let userName: DebugElement[] = fixture.debugElement.queryAll(By.css('.user-combo-element'));
         let logout: DebugElement = fixture.debugElement.query(By.css('.combo-list-item'));

         expect(userName).toBeDefined();
         expect(userName.length).toEqual(3);
         expect(userName[1]).toBeDefined();
         expect((<HTMLSpanElement>userName[1].nativeElement).textContent).toEqual(userMenu.userName);

         expect(logout).toBeNull();
      });

      it('should be show logout menu', () => {

         let userName: DebugElement[] = fixture.debugElement.queryAll(By.css('.user-combo-element'));
         let logout: DebugElement = fixture.debugElement.query(By.css('.combo-list-item'));
         spyOn(comp, 'changeMenuState');

         expect(logout).toBeNull();

         (userName[1].nativeElement as HTMLElement).click();
         fixture.detectChanges();

         logout = fixture.debugElement.query(By.css('.combo-list-item'));

         expect(logout).toBeDefined();
         expect(comp.changeMenuState).toHaveBeenCalled();
      });

      it('should be click on logout', () => {

         let userName: DebugElement[] = fixture.debugElement.queryAll(By.css('.user-combo-element'));
         spyOn(comp, 'navigateToLogout');

         (userName[1].nativeElement as HTMLElement).click();
         fixture.detectChanges();

         let logout: DebugElement = fixture.debugElement.query(By.css('.combo-list-item'));
         logout.nativeElement.dispatchEvent(new Event('click'));
         fixture.detectChanges();

         expect(comp.navigateToLogout).toHaveBeenCalled();
      });
   });
});
