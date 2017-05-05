import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { StDropdownMenuItemComponent } from './st-dropdown-menu-item/st-dropdown-menu-item.component';
import { StDropdownMenuComponent } from './st-dropdown-menu.component';

@NgModule({
   imports: [CommonModule],
   declarations: [StDropdownMenuComponent, StDropdownMenuItemComponent],
   exports: [StDropdownMenuComponent]
})
export class StDropdownMenuModule { }
