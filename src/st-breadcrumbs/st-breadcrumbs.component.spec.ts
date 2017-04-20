
import { TestBed } from '@angular/core/testing';
import { Http } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { StBreadCrumbs } from './st-breadcrumbs.component';


describe('[BreadCrumbsComponent]', () => {
   let breadCrumbsComponent: StBreadCrumbs;
   let windowRefServiceMock: any;
   let menuMock1 = ['section1', 'section2', 'section3', 'section4', 'section5'];
   let menuMock2 = ['section6', 'section7', 'section8', 'section9', 'section10'];

   beforeEach(() => {
      TestBed.configureTestingModule({
         declarations: [breadCrumbsComponent],
         providers: [breadCrumbsComponent]
      });
   });

   beforeEach(() => {
      windowRefServiceMock = {};
      windowRefServiceMock.nativeWindow = window;

      breadCrumbsComponent = new StBreadCrumbs();
   });

   describe('if initialized with 6 elements or less', () => {
      beforeEach(() => {
         breadCrumbsComponent.options = menuMock1;
      });

      it('All elements will be shown', () => {
         expect(breadCrumbsComponent.generateCrumbs()).toEqual(menuMock1);
      });

      it('And user clicks on an element, component emits the element position', () => {
         spyOn(breadCrumbsComponent.changeOption, 'emit');
         breadCrumbsComponent.onSelect(2);
         expect(breadCrumbsComponent.changeOption.emit).toHaveBeenCalledWith(2);
      });

      it('If user clicks on the active element, nothing happens', () => {
         breadCrumbsComponent.onSelect(4);
         spyOn(breadCrumbsComponent.changeOption, 'emit');
         expect(breadCrumbsComponent.changeOption.emit).not.toHaveBeenCalled();
      });

   });

   describe('if initialized when more 6 elements or less', () => {
      beforeEach(() => {
         breadCrumbsComponent.options = menuMock1.concat(menuMock2);
      });

      it('the first element will be displayed followed by 3 dots and concatenated with the last 5 items', () => {
         expect(breadCrumbsComponent.generateCrumbs()[0]).toEqual(menuMock1[0]);
         expect(breadCrumbsComponent.generateCrumbs()[1]).toEqual('...');
         expect(breadCrumbsComponent.generateCrumbs().slice(-4)).toEqual(menuMock2.slice(-4));
      });

      it('if user clicks on an element displayed after dots, component emits the real position of element', () => {
         spyOn(breadCrumbsComponent.changeOption, 'emit');
         breadCrumbsComponent.onSelect(3);
         expect(breadCrumbsComponent.changeOption.emit).toHaveBeenCalledWith(7);
      });

   });


});
