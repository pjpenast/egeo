import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import * as _ from 'lodash';

import { CheckRequired, Required } from '../decorators/require-decorators';
import { StTwoListSelectionConfig, StTwoListSelectionElement } from './st-two-list-selection.model';

@Component({
   selector: 'st-two-list-selection-view',
   templateUrl: './st-two-list-selection.view.component.html',
   styleUrls: ['./st-two-list-selection.view.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
@CheckRequired()
export class StTwoListSelectionViewComponent {

   @Input() allElements: StTwoListSelectionElement[];
   @Input() @Required() selectedElements: StTwoListSelectionElement[];

   @Output() selectAllElement: EventEmitter<StTwoListSelectionElement> = new EventEmitter<StTwoListSelectionElement>();
   @Output() selectSelectedElement: EventEmitter<StTwoListSelectionElement> = new EventEmitter<StTwoListSelectionElement>();
   @Output() searchOverAll: EventEmitter<string> = new EventEmitter<string>();
   @Output() searchOverSelected: EventEmitter<string> = new EventEmitter<string>();
   @Output() moveToSelected: EventEmitter<Event> = new EventEmitter<Event>();
   @Output() moveToAll: EventEmitter<Event> = new EventEmitter<Event>();

   @Input() config: StTwoListSelectionConfig;
   @Input() editable: boolean = false;
   @Input() @Required() qaTag: string;
   @Input() activeArrowLeft: boolean = false;
   @Input() activeArrowRight: boolean = false;

   get allTitle(): string {
      return this.config && this.config.allElementsListTitle || '';
   }

   get allPlaceholder(): string {
      return this.config && this.config.allElementsSearchPlaceholder || '';
   }

   get selectedTitle(): string {
      return this.config && this.config.selectedElementsListTitle || '';
   }

   get allQaTag(): string {
      return this.qaTag + '-all-elements';
   }

   get selectedPlaceholder(): string {
      return this.config && this.config.selectedElementsSearchPlaceholder || '';
   }

   get selectedQaTag(): string {
      return this.qaTag + '-selected-elements';
   }

   get rightClass(): string {
      return this.activeArrowRight && 'sth-two-list-selector-active' || '';
   }

   get leftClass(): string {
      return this.activeArrowLeft && 'sth-two-list-selector-active' || '';
   }
}
