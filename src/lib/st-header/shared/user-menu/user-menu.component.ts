import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, Renderer } from '@angular/core';
import { Router } from '@angular/router';

import { EventWindowManager } from '../../../utils/event-window-manager';
import { StHeaderUserMenuModel } from './user-menu.model';

@Component({
   selector: 'user-menu',
   styleUrls: ['./user-menu.component.scss'],
   templateUrl: './user-menu.component.html',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenuComponent extends EventWindowManager implements OnDestroy {

   @Input() userMenuModel: StHeaderUserMenuModel;
   @Input() qaTag: string;

   constructor(
      private router: Router,
      private renderer: Renderer,
      private cd: ChangeDetectorRef,
      private elementRef: ElementRef
   ) {
      super(renderer, cd, elementRef);
   }


   public changeMenuState(event: MouseEvent): void {
      this.openElement();
   }

   public navigateToLogout(): void {
      this.router.navigate([`/${this.userMenuModel.logoutPath}`]);
      this.closeElement();
   }

   public ngOnDestroy(): void {
      this.closeElement();
   }
}
