import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StPaginationComponent } from './st-pagination.component';

import { StButtonModule } from '../st-button/st-button.module';
import { StDropdownModule } from '../st-dropdown/st-dropdown.module';



describe('StPaginationComponent', () => {

   let component: StPaginationComponent;
   let fixture: ComponentFixture<StPaginationComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [StDropdownModule, StButtonModule],
         declarations: [StPaginationComponent]
      })
         .compileComponents();  // compile template and css
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(StPaginationComponent);
      component = fixture.componentInstance;

   });

   describe('When insert input perPage', () => {

      it('should not show dropdown', () => {
         component.perPage = 20;
         component.total = 50;
         expect(component.showItemsPerPage()).toBeFalsy();
      });

      it('should show dropdown', () => {
         component.perPage = 20;
         component.total = 1000;
         expect(component.showItemsPerPage()).toBeTruthy();
      });


      it('should not show the dropdown menu', () => {
         component.perPage = 20;
         component.total = 40;
         fixture.detectChanges();
         expect(component.showItemsPerPage()).toBeFalsy();
      });

   });

   describe('When insert input perPageOptions', () => {

      it('should be items equal to options insert by user', () => {

         component.perPageOptions = [10, 20, 30];
         fixture.detectChanges();
         expect(component.items[0].value).toBe(10);
      });

      it('should be items equal to default per page options', () => {
         fixture.detectChanges();
         expect(component.items[0].value).toBe(20);
      });


   });

   describe('When update the pagination', () => {

      it('should be the next page', () => {

         component.perPage = 20;
         component.total = 100;
         component.currentPage = 2;

         component.nextPage();
         fixture.detectChanges();

         expect(component.currentPage).toBe(3);
      });

      it('should be the prev page', () => {

         component.perPage = 20;
         component.total = 100;
         component.currentPage = 2;

         component.prevPage();
         fixture.detectChanges();

         expect(component.currentPage).toBe(1);
      });

      it('should be disable the next button', () => {

         component.perPage = 20;
         component.total = 40;
         component.currentPage = 1;

         component.nextPage();
         fixture.detectChanges();

         expect(component.disableNextButton).toBeTruthy();
      });

      it('should be disable the prev button', () => {

         component.perPage = 20;
         component.total = 40;
         component.currentPage = 2;

         component.prevPage();
         fixture.detectChanges();

         expect(component.disablePrevButton).toBeTruthy();
      });

   });

   describe('when component is update', () => {

      it('should generate new item for dropdown', () => {

         component.perPage = 20;
         component.total = 50;
         fixture.detectChanges();

         fixture.componentInstance.total = 300;

         let values = {
            total: 300
         };

         component.ngOnChanges(values);
         fixture.detectChanges();

         expect(component.items.length).toBe(3);


      });


   });


});
