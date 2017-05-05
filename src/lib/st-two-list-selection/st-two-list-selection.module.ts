import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VirtualScrollModule } from 'angular2-virtual-scroll';

// Components
import { ListItemComponent } from './list-item/list-item.component';
import { ListSelectionComponent } from './list-selection/list-selection.component';
import { StTwoListSelectionComponent } from './st-two-list-selection.component';
import { StTwoListSelectionViewComponent } from './st-two-list-selection.view.component';

// Order modules
import { PipesModule } from '../pipes/pipes.module';
import { StSearchModule } from '../st-search/st-search.module';

@NgModule({
   imports: [CommonModule, StSearchModule, PipesModule, VirtualScrollModule],
   declarations: [StTwoListSelectionViewComponent, StTwoListSelectionComponent, ListSelectionComponent, ListItemComponent],
   exports: [StTwoListSelectionComponent, StTwoListSelectionViewComponent]
})
export class StTwoListSelectionModule { }
