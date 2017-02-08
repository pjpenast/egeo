import {
   Component,
   Input,
   Output,
   EventEmitter,
   ElementRef,
   Renderer,
   ViewChild,
   AfterViewInit,
   OnDestroy,
   OnInit,
   ChangeDetectorRef,
   ChangeDetectionStrategy
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { EventWindowManager } from '../utils';

import { StDropDownMenuItem, StDropDownMenuGroup } from '../st-dropdown-menu/st-dropdown-menu.interface';

@Component({
   selector: 'st-dropdown',
   templateUrl: 'st-dropdown.component.html',
   styleUrls: ['st-dropdown.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StDropdownComponent extends EventWindowManager implements AfterViewInit, OnDestroy, OnInit {

   @Input() button: string;
   @Input() active: boolean;
   @Input() items: Array<StDropDownMenuItem> | Array<StDropDownMenuGroup>;
   @Input() default: boolean;
   @Input() disabled: boolean;
   @Input() width: string;
   @Input() qaTag: string;
   @Output() click: EventEmitter<boolean> = new EventEmitter<boolean>();
   @Output() change: EventEmitter<Object> = new EventEmitter<Object>();
   @ViewChild('buttonId') buttonElement: ElementRef;
   @ViewChild('menuId') menuElement: ElementRef;

   widthMenu: string;

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
      if (undefined === this.button) {
         throw new Error('Attribute button is required');
      }
   };

   ngOnDestroy(): void {
      this.closeElement();
   };

   changeOption(event: any): void {
      this.active = !this.active;

      if (!this.default) {
         this.button = event.label;
      }
      this.change.emit(event);
      this.closeElement();
   };

   onClickEvent(event: any): void {
      this.openElement();
      this.click.emit(true);
   };

}
