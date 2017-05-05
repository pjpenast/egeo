import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StDropDownMenuItem } from '../st-dropdown-menu.interface';

@Component({
   selector: 'st-dropdown-menu-item',
   templateUrl: './st-dropdown-menu-item.component.html',
   styleUrls: ['./st-dropdown-menu-item.component.scss']
})
export class StDropdownMenuItemComponent implements OnInit {

   @Input() item: StDropDownMenuItem;
   @Input() qaTag: string;
   @Output() change: EventEmitter<StDropDownMenuItem> = new EventEmitter<StDropDownMenuItem>();

   constructor() {
   }

   ngOnInit(): void {
      if (undefined === this.item) {
         throw new Error('Attribute item is required');
      }
   }

   onChangeItem(): void {
      this.change.emit(this.item);
   }
}
