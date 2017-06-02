import { DebugElement, Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StPopComponent } from './st-pop.component';

@Component({
   selector: 'test-component',
   template: `
      <st-pop [hidden]="hidden" [placement]="placement">
         <div pop-button>Button</div>
         <div pop-content>Content</div>
      </st-pop>
   `
})
class TestComponent {
   @Input() hidden: boolean = true;
   @Input() placement: string = 'top';
}

describe('StPopComponent', () => {

   let component: TestComponent;
   let fixture: ComponentFixture<TestComponent>;
   let de: DebugElement;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [StPopComponent, TestComponent]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
   });


   it('should show the content of the pop', () => {
      component.hidden = false;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('[hidden]')).toBeNull();
   });

   it('should hide the content of the pop', () => {
      component.hidden = true;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('[hidden]')).toBeDefined();
   });

});
