/*
 * Copyright (C) 2016 Stratio (http://stratio.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { MainComponent } from './main/main';

export const routes: Routes = [
   {
      path: '',
      component: LayoutComponent,
      children: [
         // Main redirection
         { path: '', redirectTo: 'main', pathMatch: 'full' },
         {
            path: 'alerts-demo',
            loadChildren: '@stratio/egeo-demo#StAlertsDemoModule'
         },
         {
            path: 'dropdown-demo',
            loadChildren: '@stratio/egeo#StDropdownDemoModule'
         },
         {
            path: 'dropdown-menu-demo',
            loadChildren: '@stratio/egeo#StDropdownMenuDemoModule'
         },
         { path: 'help-demo', loadChildren: '@stratio/egeo#StHelpDemoModule' },
         {
            path: 'info-box-demo',
            loadChildren: '@stratio/egeo#StInfoBoxDemoModule'
         },
         {
            path: 'item-list-demo',
            loadChildren: '@stratio/egeo#StItemListDemoModule'
         },
         { path: 'main', component: MainComponent },
         {
            path: 'search-demo',
            loadChildren: '@stratio/egeo#StSearchDemoModule'
         },
         {
            path: 'select-demo',
            loadChildren: '@stratio/egeo#StSelectDemoModule'
         },
         {
            path: 'switch-demo',
            loadChildren: '@stratio/egeo-demo#StSwitchDemoModule'
         },
         { path: 'tip-demo', loadChildren: '@stratio/egeo#StTipDemoModule' },
         {
            path: 'tooltip-demo',
            loadChildren: '@stratio/egeo-demo#StTooltipDemoModule'
         },
         { path: 'tree-demo', loadChildren: '@stratio/egeo#StTreeDemoModule' },
         {
            path: 'two-list-selection-demo',
            loadChildren: '@stratio/egeo-demo#StTwoListSelectionDemoModule'
         },
         {
            path: 'breadcrumbs',
            loadChildren: '@stratio/egeo-demo#StBreadcrumbsDemoModule'
         }
      ]
   }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
