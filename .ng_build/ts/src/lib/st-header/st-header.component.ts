import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Event, Router } from '@angular/router';

import { StHeaderModel, StHeaderUserMenuModel, StSubMenuModel } from './st-header.model';

@Component({
   selector: 'st-header',
   template: `
     <div class="sth-header header basic-header" [ngStyle]="getHeaderStyle()">
        <div class="menu menu-height st-header-menu">
           <div class="sth-header-border header-border">
              <div class="sth-header-user-container" *ngIf="hasUserMenu()">
                 <div class="sth-header-border-separator"></div>
                 <user-menu [userMenuModel]="userMenu" [qaTag]="qaTag"></user-menu>
              </div>
           </div>
           <app-name [appName]="appName" [companyName]="companyName" [appLogoPath]="appLogoPath" [qaTag]="qaTag" class="app-name"></app-name>
           <navigation-links [menu]="menu" class="navigation-links" (positionChange)="onPositionChange($event)" [qaTag]="qaTag"></navigation-links>
        </div>
        <div class="sth-sub-menu sub-menu">
           <div *ngIf="hasSubmenu()" class="submenu-wrapper">
           <submenu [submenu]="selectedSubmenu" [offset]="navigationOffset" [qaTag]="qaTag"></submenu>
           </div>
        </div>
     </div>
   `,
   styles: [`
     .menu {
       position: relative;
       display: flex;
       flex-direction: row;
       overflow-x: hidden;
       white-space: nowrap; }

     .basic-header {
       display: block;
       z-index: 1000;
       width: 100%;
       margin: auto;
       left: 0;
       right: 0;
       top: 0; }

     :host-context(.st-header-normal) .header {
       position: absolute; }

     :host-context(.st-header-collapsed) .header {
       position: fixed; }

     :host-context(.st-header-normal) .menu-height {
       height: 95px; }

     :host-context(.st-header-collapsed) .menu-height {
       height: 50px; }

     :host-context(.st-header-normal) .header-border {
       height: 10px;
       width: 100%;
       z-index: 10;
       position: absolute;
       top: 0; }

     :host-context(.st-header-collapsed) .header-border {
       display: none; }

     :host-context(.st-header-normal) .app-name {
       margin: 0 30px 0 30px;
       padding-top: 35px; }

     :host-context(.st-header-collapsed) .app-name {
       margin: 0 30px 0 30px;
       padding-top: 7px; }

     :host-context(.st-header-normal) .navigation-links {
       padding-top: 52px; }

     :host-context(.st-header-collapsed) .navigation-links {
       padding-top: 10px; }

     :host-context(.st-header-normal) .sub-menu {
       min-height: 5px;
       width: 100%; }

     :host-context(.st-header-collapsed) .sub-menu {
       min-height: 5px;
       width: 100%;
       filter: opacity(0.95); }

     :host-context(.st-header-normal) .submenu-wrapper {
       height: 45px; }

     :host-context(.st-header-collapsed) .submenu-wrapper {
       height: 30px; }
   `]
})
export class StHeaderComponent implements OnInit {

   @Input() appName: string | undefined;
   @Input() companyName: string = 'Stratio';

   // TODO: In the future this header can use image or text for now, only use text
   appLogoPath: string | undefined;

   @Input() maxWidth: number;

   @Input() menu: StHeaderModel[] = [];

   @Input() userMenu: StHeaderUserMenuModel;
   @Input() qaTag: string;

   @Output() contentChangeOffset: EventEmitter<number> = new EventEmitter<number>();

   selectedSubmenu: StSubMenuModel[] = [];
   navigationOffset: number = 0;

   private headerOffset: number = 0;
   private showSubmenu: boolean = false;

   constructor(
      private _router: Router,
      private _cd: ChangeDetectorRef,
      private el: ElementRef
   ) { }

   public hasSubmenu(): boolean {
      let menu: StHeaderModel | undefined = this.menu.find((menuOption) => this._router.url.includes(menuOption.link));
      if (menu !== undefined && menu.subMenus !== undefined && menu.subMenus.length > 0) {
         this.selectedSubmenu = menu.subMenus;
         this.checkIfNotify(true);
         return true;
      } else {
         this.selectedSubmenu = [];
         this.checkIfNotify(false);
         return false;
      }
   }

   public ngOnInit(): void {
      if (!this.qaTag) {
         throw new Error('qaTag is a necesary field');
      }
      this.headerOffset = this.el.nativeElement.getBoundingClientRect().left;
      this.showSubmenu = this.hasSubmenu();
      this.notifyOffset();
   }

   public onPositionChange(newPosition: number): void {
      this.navigationOffset = newPosition - this.headerOffset;
      this._cd.markForCheck();
   }

   public hasUserMenu(): boolean {
      return this.userMenu !== undefined;
   }

   public getHeaderStyle(): Object {
      if (this.maxWidth !== undefined && typeof this.maxWidth === 'number' && this.maxWidth > 0) {
         return {
            'max-width': `${this.maxWidth}px`
         };
      } else {
         return {};
      }
   }

   private checkIfNotify(hasSubMenu: boolean): void {
      if (this.showSubmenu !== hasSubMenu) {
         this.showSubmenu = hasSubMenu;
         this.notifyOffset();
      }
   }

   private notifyOffset(): void {
      if (this.showSubmenu) {
            this.contentChangeOffset.emit(140);
         } else {
            this.contentChangeOffset.emit(95);
         }
   }
}
