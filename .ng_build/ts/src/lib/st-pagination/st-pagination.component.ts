import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

import { StDropDownMenuItem } from '../st-dropdown-menu/st-dropdown-menu.interface';
import { Paginate, PaginateTexts } from './st-pagination.interface';

@Component({
   selector: 'st-pagination',
   template: `
     <div class="sth-pagination pagination" [ngClass]="theme">
        <div class="selector" *ngIf="showItemsPerPage()">
           <st-dropdown [themeClass]="getThemeDropdown()" [items]="items" (change)="onChangePerPage($event)" attr.id="{{'dropdown' + qaTag}}"></st-dropdown>
        </div>

        <div class="navigator sth-pagination-navigator">
           <p class="sth-pagination-pages">{{firstItem}}-{{lastItem}} {{label.of || 'of'}} {{total}}</p>

           <div class="buttons">
              <st-button typeClass="btnTool" subtypeClass="subtype4" attr.id="{{'buttonPrev' + qaTag}}" leftIcon="icon-arrow2_left" inputType="button"
                 (onClick)="prevPage()" [isDisabled]="disablePrevButton"></st-button>
              <st-button typeClass="btnTool" subtypeClass="subtype4" attr.id="{{'buttonNext' + qaTag}}" leftIcon="icon-arrow2_right" inputType="button"
                 (onClick)="nextPage()" [isDisabled]="disableNextButton"></st-button>
           </div>
        </div>
     </div>
   `,
   styles: [`
     .pagination {
       display: flex;
       justify-content: space-around;
       align-items: center;
       padding: 20px 5px; }
       .pagination .selector {
         margin-right: auto; }
       .pagination .navigator {
         margin-left: auto;
         display: flex;
         align-items: center; }
         .pagination .navigator p {
           margin: 0;
           padding: 0 15px; }
       .pagination st-button:first-child {
         margin: 0 5px; }
   `],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StPaginationComponent implements OnInit, OnChanges {

   @Input() total: number;
   @Input() perPage: number = 20;
   @Input() perPageOptions: number[] = [20, 50, 100];
   @Input() currentPage: number = 1;
   @Input() label: PaginateTexts;
   @Input() qaTag: string;
   @Input() showPerPage: boolean = false;
   @Input() hidePerPage: boolean = false;
   @Input() theme: string = 'themeA';

   @Output() change: EventEmitter<Paginate> = new EventEmitter<Paginate>();

   public disableNextButton: boolean = false;
   public disablePrevButton: boolean = true;
   public firstItem: number;
   public lastItem: number;
   public items: StDropDownMenuItem[] = [];

   constructor(
      private cd: ChangeDetectorRef
   ) {
      if (!this.label) {
         this.label = {
            display: 'Display',
            element: 'elements',
            perPage: 'per page',
            of: 'of'
         };
         this.cd.markForCheck();
      }
   }

   ngOnInit(): void {
      this.updatePages(false);
      this.generateItems();
   }

   ngOnChanges(values: any): void {
      if (values.total) {
         this.generateItems();
         this.updatePages(false);
      }

      if (values.currentPage || values.perPage) {
         this.updatePages(false);
      }

   }

   generateItems(): void {
      this.items = [];
      this.perPageOptions.forEach((option) => {
         this.items.push(this.generateItem(option));
      });
   }

   generateItem(n: number): StDropDownMenuItem {
      return ({
         label: `${this.label.display} ${n} ${this.label.element} ${this.label.perPage}`,
         value: n,
         selected: this.checkSelected(n)
      });
   }

   checkSelected(value: number): boolean {
      if (this.perPage <= value) {
         return true;
      }

      return false;
   }

   showItemsPerPage(): boolean {

      if (this.showPerPage) {
         return true;
      }

      if (this.hidePerPage) {
         return false;
      }

      if (this.total <= 50) {
         return false;
      }

      return true;
   }

   nextPage(): void {
      this.currentPage++;
      this.updatePages();
   }

   prevPage(): void {
      this.currentPage--;
      this.updatePages();
   }

   updatePages(emit: boolean = true): void {

      this.lastItem = (this.perPage * this.currentPage);

      if (this.currentPage === 1) {
         this.firstItem = this.currentPage;
         this.disablePrevButton = true;
      } else {
         this.firstItem = this.perPage * (this.currentPage - 1) + 1;
         this.disablePrevButton = false;
      }

      if (this.lastItem >= this.total) {
         this.lastItem = this.total;
         this.disableNextButton = true;
      } else {
         this.disableNextButton = false;
      }

      if (emit) {
         this.change.emit({
            currentPage: this.currentPage,
            perPage: this.perPage
         });
      }
   }

   onChangePerPage(item: StDropDownMenuItem): void {
      this.currentPage = 1;
      this.perPage = item.value;
      this.updatePages();
   }

   getThemeDropdown(): string {
      if (this.theme === 'themeA') {
         return 'themeB';
      } else {
         return 'themeA';
      }
   }

}
