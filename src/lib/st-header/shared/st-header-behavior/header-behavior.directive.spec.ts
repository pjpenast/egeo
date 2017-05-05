import { Component } from '@angular/core';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// Directive
import { StHeaderBehaviorDirective } from './header-behavior.directive';


@Component({
   styles: ['body {height: 1600px; overflow-y: scroll}'],
   template: '<div stHeaderBehavior></div>'
})
class DummyComponent { }

let comp: DummyComponent;
let fixture: ComponentFixture<DummyComponent>;
let de: DebugElement;


describe('StHeader component', () => {
   describe('StHeader componentBehavior directive', () => {
      beforeEach(async(() => {
         TestBed.configureTestingModule({
            declarations: [StHeaderBehaviorDirective, DummyComponent]
         })
            .compileComponents();  // compile template and css
      }));

      beforeEach(() => {
         fixture = TestBed.createComponent(DummyComponent);
         comp = fixture.componentInstance;

         fixture.autoDetectChanges(true);
      });

      it('should be init with st-header-normal', () => {
         let div: DebugElement = fixture.debugElement.query(By.css('div'));

         expect(div.classes['st-header-normal']).toBeTruthy();
      });

      // TODO: Simulate scroll and test change of class
   });
});
