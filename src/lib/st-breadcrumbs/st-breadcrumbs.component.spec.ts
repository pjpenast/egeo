
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Http } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { StBreadCrumbs } from './st-breadcrumbs.component';


describe('[BreadCrumbsComponent]', () => {
   let component: StBreadCrumbs;
   let fixture: ComponentFixture<StBreadCrumbs>;

   let windowRefServiceMock: any;
   let menuMock1 = ['section1', 'section2', 'section3', 'section4', 'section5'];
   let menuMock2 = ['section6', 'section7', 'section8', 'section9', 'section10'];

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [StBreadCrumbs]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      windowRefServiceMock = {};
      windowRefServiceMock.nativeWindow = window;
      fixture = TestBed.createComponent(StBreadCrumbs);
      component = fixture.componentInstance;
   });

   describe('if initialized with 6 elements or less', () => {
      beforeEach(() => {
         component.options = menuMock1;
      });

      it('All elements will be shown', () => {
         expect(component.generateCrumbs()).toEqual(menuMock1);
      });

      it('And user clicks on an element, component emits the element position', () => {
         spyOn(component.changeOption, 'emit');
         component.onSelect(2);
         expect(component.changeOption.emit).toHaveBeenCalledWith(2);
      });

      it('If user clicks on the active element, nothing happens', () => {
         component.onSelect(4);
         spyOn(component.changeOption, 'emit');
         expect(component.changeOption.emit).not.toHaveBeenCalled();
      });

   });

   describe('if initialized when more 6 elements or less', () => {
      beforeEach(() => {
         component.options = menuMock1.concat(menuMock2);
      });

      it('the first element will be displayed followed by 3 dots and concatenated with the last 5 items', () => {
         expect(component.generateCrumbs()[0]).toEqual(menuMock1[0]);
         expect(component.generateCrumbs()[1]).toEqual('...');
         expect(component.generateCrumbs().slice(-4)).toEqual(menuMock2.slice(-4));
      });

      it('if user clicks on an element displayed after dots, component emits the real position of element', () => {
         spyOn(component.changeOption, 'emit');
         component.onSelect(3);
         expect(component.changeOption.emit).toHaveBeenCalledWith(7);
      });
   });
});
