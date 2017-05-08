import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { StSubMenuModel } from '../st-header.model';

@Component({
   selector: 'submenu',
   styleUrls: ['./submenu.component.scss'],
   templateUrl: './submenu.component.html',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubmenuComponent {

   @Input() submenu: StSubMenuModel[] = [];
   @Input() qaTag: string;
   @Input() offset: number = 0;

   public getOffset(): Object {
      return {
         'margin-left': `${this.offset}px`
      };
   }

   public isActive(option: StSubMenuModel): string {
      if (!option.isActive) {
         return 'sth-header-submenu-disable-option';
      } else {
         return '';
      }
   }
}
