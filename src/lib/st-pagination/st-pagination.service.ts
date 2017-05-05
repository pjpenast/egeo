import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class StPaginationService {

   private initItem: number;
   private lastItem: number;

   constructor() {

   }

   newPage(items: any[], currentPage: number, perPage: number): any[] {
      if (currentPage === 1) {
         this.initItem = 0;
      } else {
         this.initItem = perPage * (currentPage - 1);
      }

      if (perPage >= items.length) {
         return Object.assign([], items);
      }

      if (this.initItem >= items.length) {
         this.initItem = items.length - (perPage + 1);
         return Object.assign([], _.takeRight(items, perPage));
      }

      this.lastItem = (this.initItem + perPage);

      return Object.assign([], items.slice(this.initItem, this.lastItem));
   }

}
