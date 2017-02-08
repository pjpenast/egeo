import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
   selector: 'layout',
   templateUrl: './layout.component.html',
   styleUrls: ['./layout.component.scss']
})

export class LayoutComponent {
   @Input() currentUrl: string;

   public isFormsOpened: boolean = false;
   public isButtonsOpened: boolean = false;
   public isUtilsOpened: boolean = false;
   public isNavigationOpened: boolean = false;
   public isTabsOpened: boolean = false;


   private formsUrls: Array<string> = ['/input'];
   private buttonsUrls: Array<string> = ['/button', '/toggle-buttons'];
   private utilsUrls: Array<string> = ['/regexp'];
   private navigationUrls: Array<string> = ['/navigation/radio-menu', '/navigation/header', '/navigation/horizontal-tabs'];
   private tabsUrls: Array<string> = ['/tab-box', '/vertical-menu'];

   constructor(private router: Router) {

      router.events.subscribe((val) => {
         this.currentUrl = val.url;
         this.checkUrl();
      });
   }

   checkUrl(): void {

      if (this.containUrl(this.formsUrls, this.currentUrl)) {
         this.isFormsOpened = true;
      }
      if (this.containUrl(this.buttonsUrls, this.currentUrl)) {
         this.isButtonsOpened = true;
      }
      if (this.containUrl(this.utilsUrls, this.currentUrl)) {
         this.isUtilsOpened = true;
      }
      if (this.containUrl(this.navigationUrls, this.currentUrl)) {
         this.isNavigationOpened = true;
      }
      if (this.containUrl(this.tabsUrls, this.currentUrl)) {
         this.isTabsOpened = true;
      }
   }

   private containUrl(list: Array<string>, value: string): boolean {
      let result: string | undefined = list.find((item) => item === value);
      return result !== undefined;
   }
}
