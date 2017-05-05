import {
   ChangeDetectionStrategy,
   ChangeDetectorRef,
   Component,
   EventEmitter,
   Input,
   OnChanges,
   OnInit,
   Output,
   SimpleChanges
} from '@angular/core';
import * as _ from 'lodash';

import { CheckRequired, Required } from '../decorators/require-decorators';
import { StTwoListSelection } from './st-two-list-selection';
import { StTwoListSelectionConfig, StTwoListSelectionElement } from './st-two-list-selection.model';

@Component({
   selector: 'st-two-list-selection',
   template: `
      <st-two-list-selection-view
         [allElements]="allList | stFilterList:searchBy:allSearch"
         [selectedElements]="selectedList | stFilterList:searchBy:selectedSearch"
         [config]="config"
         [editable]="editable"
         [qaTag]="qaTag"

         [activeArrowLeft]="canActivateArrowLeft()"
         [activeArrowRight]="canActivateArrowRight()"

         (selectAllElement)="onSelectAllElement($event)"
         (selectSelectedElement)="onSelectSelectedElement($event)"
         (searchOverAll)="onSearchOverAll($event)"
         (searchOverSelected)="onSearchOverSelected($event)"
         (moveToSelected)="onMoveToSelected($event)"
         (moveToAll)="onMoveToAll($event)"
      ></st-two-list-selection-view>
   `,
   changeDetection: ChangeDetectionStrategy.OnPush
})
@CheckRequired()
export class StTwoListSelectionComponent extends StTwoListSelection implements OnInit, OnChanges {

   @Input() @Required('editable') allElements: StTwoListSelectionElement[];
   @Input() @Required() selectedElements: StTwoListSelectionElement[];
   @Output() selectedElementsChange: EventEmitter<StTwoListSelectionElement[]> = new EventEmitter<StTwoListSelectionElement[]>();

   @Input() config: StTwoListSelectionConfig;
   @Input() editable: boolean = false;
   @Input() @Required() qaTag: string;
   @Input() sortBy: 'id' | 'name' = 'id';

   constructor(private cd: ChangeDetectorRef) {
      super(cd);
   }

   ngOnInit(): void {
      this.init(
         this.allElements,
         this.selectedElements,
         this.selectedElementsChange,
         this.sortBy
      );
   }

   ngOnChanges(changes: SimpleChanges): void {
      this.checkChanges(changes, 'allElements', 'selectedElements');
   }

   get allList(): StTwoListSelectionElement[] {
      return this.copyAllElement;
   }

   get selectedList(): StTwoListSelectionElement[] {
      return this.copySelectedElements;
   }
}
