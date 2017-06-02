import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StFilterList } from './search-filter.pipe';

@NgModule({
   imports: [CommonModule],
   declarations: [StFilterList],
   exports: [StFilterList]
})
export class PipesModule { }
