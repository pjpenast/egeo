import { Pipe, PipeTransform } from '@angular/core';

import { StPaginationService } from './st-pagination.service';


@Pipe({
   name: 'paginate',
   pure: false
})
export class StPaginationPipe implements PipeTransform {
   constructor(
      private service: StPaginationService
   ) { }

   transform(items: any[], args: any): any {
      return this.service.newPage(items, args.currentPage, args.perPage);
   }


}
