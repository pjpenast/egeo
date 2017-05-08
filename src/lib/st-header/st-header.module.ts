import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {AppNameComponent} from './app-name/app-name.component';
import {NavigationLinksComponent} from './navigation-links/navigation-links.component';
import {StHeaderBehaviorDirective} from './st-header-behavior/header-behavior.directive';
import {SubmenuComponent} from './submenu/submenu.component';
import {SubmenuPosDirective} from './submenu-pos/submenu-pos.directive';
import {UserMenuComponent} from './user-menu/user-menu.component';

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
