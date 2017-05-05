import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {AppNameComponent} from './shared/app-name/app-name.component';
import {NavigationLinksComponent} from './shared/navigation-links/navigation-links.component';
import {StHeaderBehaviorDirective} from './shared/st-header-behavior/header-behavior.directive';
import {SubmenuComponent} from './shared/submenu/submenu.component';
import {SubmenuPosDirective} from './shared/submenu-pos/submenu-pos.directive';
import {UserMenuComponent} from './shared/user-menu/user-menu.component';

import { StHeaderComponent } from './st-header.component';

@NgModule({
   imports: [CommonModule, RouterModule],
   declarations: [
      SubmenuPosDirective,
      StHeaderComponent,
      AppNameComponent,
      NavigationLinksComponent,
      SubmenuComponent,
      UserMenuComponent,
      StHeaderBehaviorDirective
   ],
   exports: [StHeaderComponent, StHeaderBehaviorDirective]
})
export class StHeaderModule { }
