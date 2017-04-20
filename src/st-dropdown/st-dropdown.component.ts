import {
   AfterViewInit,
   ChangeDetectionStrategy,
   ChangeDetectorRef,
   Component,
   ElementRef,
   EventEmitter,
   Input,
   OnChanges,
   OnDestroy,
   OnInit,
   Output,
   Renderer,
   ViewChild
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { EventWindowManager } from '../utils';

import { StDropDownMenuGroup, StDropDownMenuItem } from '../st-dropdown-menu/st-dropdown-menu.interface';

@Component({
   selector: 'st-dropdown',
   templateUrl: 'st-dropdown.component.html',
   styleUrls: ['st-dropdown.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StDropdownComponent extends EventWindowManager implements AfterViewInit, OnDestroy, OnInit, OnChanges {

   @Input() button: string;
   @Input() active: boolean;
   @Input() items: Array<StDropDownMenuItem | StDropDownMenuGroup>;
   @Input() default: boolean;
   @Input() firstSelected: boolean;
   @Input() disabled: boolean;
   @Input() width: string;
   @Input() qaTag: string;
   @Input() themeClass: string;
   @Output() click: EventEmitter<boolean> = new EventEmitter<boolean>();
   @Output() change: EventEmitter<Object> = new EventEmitter<Object>();
   @ViewChild('buttonId') buttonElement: ElementRef;
   @ViewChild('menuId') menuElement: ElementRef;

   public widthMenu: string;

   constructor(
      private renderer: Renderer,
      private cd: ChangeDetectorRef,
      @ViewChild('buttonId') buttonElement: ElementRef
   ) {
      super(renderer, cd, buttonElement);
   };

   ngAfterViewInit(): void {
      setTimeout(() => {
         this.widthMenu = this.buttonElement.nativeElement.offsetWidth + 'px';
         this.cd.markForCheck();
      });
   };

   ngOnInit(): void {
      if (undefined === this.items) {
         throw new Error('Attribute items is required');
      }

      this.checkFirstSelected();
      this.findSelected();
   };

   ngOnChanges(values: any): void {
      if (values.items) {
         this.checkFirstSelected();
         this.findSelected();
      }
   }

   ngOnDestroy(): void {
      this.closeElement();
   };

   public changeOption(item: StDropDownMenuItem): void {
      this.active = !this.active;
      this.updateSelected(item);

      if (!this.default)
         this.button = item.label;
      this.change.emit(item);
      this.closeElement();
   };

   public onClickEvent(event: MouseEvent): void {
      this.openElement();
      this.click.emit(true);
   };

   private findSelected(): void {
      if (this.isStDropdownItem(this.items)) {
         let item = this.items.find((object) => object.selected === true);
         if (item) {
            this.button = item.label;
            this.cd.markForCheck();
         }
      }
   }

   private isStDropdownItem(items: Array<StDropDownMenuItem | StDropDownMenuGroup>): items is StDropDownMenuItem[] {
      if (items && items.length > 0) {
         return (<StDropDownMenuGroup[]>items)[0].items === undefined;
      }
   }

   private updateSelected(item?: StDropDownMenuItem): void {

      if (this.isStDropdownItem(this.items)) {
         let itemSelected = this.items.find((object) => object.selected === true);

         if (itemSelected) {
            itemSelected.selected = false;
         }

         if (item) {
            let element = this.items.find((i) => i === item);
            element.selected = true;
         }
      }

   }

   private checkFirstSelected(): void {

      if (this.firstSelected) {
         if (this.isStDropdownItem(this.items)) {
            this.updateSelected();
            this.items[0].selected = true;
         }
      }

   }

}
