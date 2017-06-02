import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { StDropDownMenuGroup, StDropDownMenuItem } from './st-dropdown-menu.interface';

@Component({
   selector: 'st-dropdown-menu',
   template: `
     <div class="sth-dropdown-menu dropdown-menu" *ngIf="active" [ngClass]="{'active': active}">
        <ul *ngIf="!itemsGroup.length" [attr.aria-hidden]="!active" aria-label="submenu">
           <st-dropdown-menu-item (change)="onChange($event)" *ngFor="let i of items" [item]="i"></st-dropdown-menu-item>
        </ul>

        <div *ngIf="itemsGroup.length">
           <ul *ngFor="let item of itemsGroup" [attr.aria-hidden]="!active" aria-label="submenu">
              <li class="sth-dropdown-menu-parent"><h3>{{ item.title }}</h3>
                 <ul>
                    <st-dropdown-menu-item (change)="onChange($event)" *ngFor="let i of item.items" [item]="i"></st-dropdown-menu-item>
                 </ul>
              </li>
           </ul>
        </div>
     </div>
   `,
   styles: [`
     .dropdown-menu {
       box-shadow: 0px 3px 2px 0 rgba(1, 1, 1, 0.07);
       border: 1px solid rgba(1, 1, 1, 0.07);
       padding: 7px 0;
       max-height: 265px;
       overflow: auto; }
       .dropdown-menu.active {
         display: block; }
       .dropdown-menu ul, .dropdown-menu li {
         margin: 0;
         padding: 0;
         list-style: none; }
       .dropdown-menu ul h3 {
         padding: 7px 14px;
         margin: 10px 0 0 0;
         white-space: nowrap;
         overflow: hidden;
         text-overflow: ellipsis; }
       .dropdown-menu ul li.children {
         padding: 7px 14px;
         cursor: pointer;
         white-space: nowrap;
         overflow: hidden;
         text-overflow: ellipsis; }
   `],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StDropdownMenuComponent implements OnInit {

   @Input() active: boolean;
   @Input() items: StDropDownMenuItem[] | StDropDownMenuGroup[];
   @Output() change: EventEmitter<StDropDownMenuItem> = new EventEmitter<StDropDownMenuItem>();

   private itemsGroup: StDropDownMenuGroup[] = [];

   constructor() {
   }

   ngOnInit(): void {

      if (undefined === this.items) {
         throw new Error('Attribute items is required');
      }

      this.checkGroup();
   }

   ngOnChanges(values: any): void {
      if (values.items) {
         this.checkGroup();
      }
   }

   checkGroup(): void {
      if (this.isDropDownGroup(this.items)) {
         this.itemsGroup = this.items;
      }
   }

   isDropDownGroup(value: StDropDownMenuItem[] | StDropDownMenuGroup[]): value is StDropDownMenuGroup[] {
      return value && value.length > 0 && (<StDropDownMenuGroup>value[0]).title !== undefined;
   }

   onChange(value: StDropDownMenuItem): void {
      this.change.emit(value);
   }



}

