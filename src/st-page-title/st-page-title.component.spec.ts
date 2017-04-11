import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { dispatchEvent } from '@angular/platform-browser/testing/browser_util';

// Component
import { StButtonModule } from '../st-button';
import { StPageTitleComponent } from './st-page-title.component';

let component: StPageTitleComponent;
let fixture: ComponentFixture<StPageTitleComponent>;


describe('StPageTitleComponent', () => {
   beforeEach(() => {
      TestBed.configureTestingModule({
         imports: [StButtonModule],
         declarations: [StPageTitleComponent]
      });

      fixture = TestBed.createComponent(StPageTitleComponent);
      component = fixture.componentInstance;
      component.qaTag = 'test qaTag';
   });

   it('Throw error if not qaTag', () => {
      component.leftButton = undefined;
      component.qaTag = undefined;

      try {
         expect(fixture.detectChanges()).toThrow();
      } catch (error) {
         expect(error.message).toContain('ST-PAGE-TITLE: qa field is required');
      }
   });


   it(`Only when there is the input 'leftButton', button is shown before title`, () => {
      component.leftButton = undefined;
      fixture.detectChanges();

      let button: HTMLButtonElement = fixture.nativeElement.querySelector('.st-page-title button');
      expect(button).toBeNull();

      component.leftButton = 'icon-reply';
      fixture.detectChanges();

      button = fixture.nativeElement.querySelector('.st-page-title button');
      expect(button).toBeDefined();
   });


   it('Emit when click on button', () => {
      let responseFunction = jasmine.createSpy('response');

      component.leftButton = 'icon-reply';
      component.clickButton.subscribe(responseFunction);

      fixture.detectChanges();

      let button: DebugElement = fixture.debugElement.query(By.css('button'));
      expect(button).toBeDefined();

      dispatchEvent(button.nativeElement, 'click');
      fixture.detectChanges();

      expect(responseFunction).toHaveBeenCalled();
   });
});
