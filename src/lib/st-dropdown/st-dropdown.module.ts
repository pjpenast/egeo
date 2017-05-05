import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { StDropdownMenuModule } from '../st-dropdown-menu/st-dropdown-menu.module';

import { StDropdownComponent } from './st-dropdown.component';

@NgModule({
   imports: [CommonModule, StDropdownMenuModule],
   declarations: [StDropdownComponent],
   exports: [StDropdownComponent]
})
export class StDropdownModule {
}
