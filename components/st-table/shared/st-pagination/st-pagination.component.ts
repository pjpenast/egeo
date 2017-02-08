import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { Page } from './st-pagination.model';

@Component({
   selector: 'gosec-pagination',
   styleUrls: ['./st-pagination.component.scss'],
   templateUrl: './st-pagination.component.html',
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class GosecPaginationComponent implements OnChanges {
   @Input() pagination: Page;
   @Input() totalElements: number;
   @Output() changePage: EventEmitter<number> = new EventEmitter<number>();

   SIZE_PER_NUM: number = 50;
   size: string;
   pages: Array<number>;
   pageInMiddle: number;

   constructor(private cd: ChangeDetectorRef) { }

   ngOnChanges(changes: SimpleChanges): void {
      this.pagination.limit = this.checkPaginationLimit(); // Check limits
      this.size = (this.SIZE_PER_NUM * this.pagination.limit) + 'px';
      this.createArray(); // create array of pages
      this.checkOverflow(); // Check if current page > length or currentPage = 0 with available pages
      this.pageInMiddle = this.pagination.currentPage > ((this.pagination.limit - 1) / 2) ? this.pagination.currentPage : (this.pagination.limit + 1) / 2;
      this.cd.markForCheck();
   }

   checkOverflow(): void {
      if ((this.pagination.currentPage > this.pages.length || this.pagination.currentPage === 0) && this.pages.length > 0) {
         this.changePage.emit(this.pages.length);
      }
   }

   checkPaginationLimit(): number {
      let limit: number = (this.pagination.limit) <= 3 ? 5 : this.pagination.limit;
      return limit % 2 === 0 ? limit + 1 : limit; // Check if is odd
   }

   createArray(): void {
      let final: number = Math.ceil(this.totalElements / this.pagination.elementsPerPage);
      this.pages = Array.apply(undefined, { length: final }).map((v: number, i: number) => i + 1);
   }

   setPage(page: number): void {
      if (this.pagination.currentPage !== page) {
         this.changePage.emit(page);
      }
   }

   isMoreButtonHidden(button: string): boolean {
      switch (button) {
         case 'prev':
            return this.pageInMiddle - ((this.pagination.limit + 1) / 2) <= 0;
         case 'next':
            return this.pageInMiddle + ((this.pagination.limit - 1) / 2) > this.pages.length;
         default:
            return true;
      }
   }

   isInvisible(page: number): boolean {
      return ((page - this.pageInMiddle) < -(Math.floor(this.pagination.limit / 2) + 1) ||
         !this.isMoreButtonHidden('next') && ((page - this.pageInMiddle) > (Math.floor(this.pagination.limit / 2) - 1)) ||
         !this.isMoreButtonHidden('prev') && ((page - this.pageInMiddle) < (-Math.floor(this.pagination.limit / 2) + 1)));
   }

   getPosition(page: number): number {
      return ((page - this.pageInMiddle) + Math.floor(this.pagination.limit / 2)) * this.SIZE_PER_NUM;
   }
}
