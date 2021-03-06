/*
 * © 2017 Stratio Big Data Inc., Sucursal en España.
 *
 * This software is licensed under the Apache License, Version 2.0.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the terms of the License for more details.
 *
 * SPDX-License-Identifier: Apache-2.0.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StPaginationComponent } from './st-pagination.component';
import { StPaginationPipe } from './st-pagination.pipe';
import { StPaginationService } from './st-pagination.service';

import { StButtonModule } from '../st-button/st-button.module';
import { StDropdownModule } from '../st-dropdown/st-dropdown.module';

@NgModule({
   imports: [ CommonModule, StButtonModule, StDropdownModule ],
   exports: [ StPaginationComponent, StPaginationPipe ],
   declarations: [ StPaginationComponent, StPaginationPipe ],
   providers: [
      StPaginationService
   ]
})
export class StPaginationModule { }
